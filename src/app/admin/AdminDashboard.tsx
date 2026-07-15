"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  getInventoryFallbackImage,
  resolveBuildingImage,
} from "@/data/buildings";
import { ALL_MODEL_TYPES, getModelRoute } from "@/lib/model-routes";
import styles from "./AdminDashboard.module.css";

/* ── Model Description Types ── */
interface DescRow {
  model_type: string;
  heading: string;
  body: string;
  bullets: string;       // newline-separated list stored as plain text
  sizes_image_url: string;
}
const EMPTY_DESC: Omit<DescRow, "model_type"> = {
  heading: "",
  body: "",
  bullets: "",
  sizes_image_url: "",
};

/* ── Types ── */
interface InventoryItem {
  id: string;
  slug: string;
  model_type: string;
  inventory_number: string;
  size: string;
  width: number;
  length: number;
  wall_color: string;
  trim_color: string;
  roof_color: string;
  cash_price: string;
  sale_price: string | null;
  is_on_sale: boolean;
  rto_36: string;
  rto_48: string;
  image_url: string;
  designer_template: number;
  sort_order: number;
  notes: string;
  building_material: string;
}

type FormState = Omit<InventoryItem, "id">;

const EMPTY_FORM: FormState = {
  slug: "",
  model_type: "",
  inventory_number: "",
  size: "",
  width: 0,
  length: 0,
  wall_color: "",
  trim_color: "",
  roof_color: "",
  cash_price: "",
  sale_price: null,
  is_on_sale: false,
  rto_36: "",
  rto_48: "",
  image_url: "",
  designer_template: 25,
  sort_order: 0,
  notes: "",
  building_material: "",
};

const MATERIAL_OPTIONS = ["Metal", "Wood", "Vinyl"] as const;
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

const parseCurrency = (value: string | null): number => {
  if (!value) return 0;
  return Number.parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
};

const formatCurrency = (amount: number): string =>
  `${amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} +tax`;

const calculateRto = (price: string): Pick<FormState, "rto_36" | "rto_48"> => {
  const amount = parseCurrency(price);
  return amount > 0
    ? {
        rto_36: formatCurrency(amount / 21.6),
        rto_48: formatCurrency(amount / 25.44),
      }
    : { rto_36: "", rto_48: "" };
};

const preparePhotoForUpload = async (file: File): Promise<File> => {
  if (file.size <= MAX_UPLOAD_BYTES && file.type !== "image/heic" && file.type !== "image/heif") {
    return file;
  }
  if (file.type === "image/gif") {
    throw new Error("Please choose a GIF smaller than 4 MB.");
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new window.Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("This photo format could not be read. Please use JPEG or PNG."));
      element.src = objectUrl;
    });
    const scale = Math.min(1, 2400 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("The photo could not be prepared for upload.");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
    if (!blob || blob.size > MAX_UPLOAD_BYTES) {
      throw new Error("The photo is still too large. Please choose a smaller photo.");
    }
    return new File([blob], `${file.name.replace(/\.[^.]+$/, "") || "inventory-photo"}.jpg`, {
      type: "image/jpeg",
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

function AdminInventoryPhoto({
  source,
  slug,
  modelType,
  alt,
  className,
}: {
  source: string;
  slug: string;
  modelType: string;
  alt: string;
  className: string;
}) {
  const fallbackImage = getInventoryFallbackImage(slug, modelType);
  const [imageSrc, setImageSrc] = useState(() =>
    resolveBuildingImage(source, fallbackImage)
  );

  return (
    // Admin inventory may contain user-entered image hosts that are not in next.config.ts.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        setImageSrc((current) =>
          current === fallbackImage ? "/logo.png" : fallbackImage
        );
      }}
    />
  );
}

/* ── Main Component ── */
export default function AdminDashboard() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tab, setTab] = useState<"inventory" | "descriptions">("inventory");

  /* ── Inactivity auto-logout (30 min) ── */
  const IDLE_TIMEOUT = 30 * 60 * 1000;   // 30 minutes
  const WARN_BEFORE  =  5 * 60 * 1000;   //  5 minutes warning
  const lastActivityRef = useRef<number | null>(null);
  const [idleWarning, setIdleWarning] = useState(false);
  const [idleMinsLeft, setIdleMinsLeft] = useState(5);

  useEffect(() => {
    const resetIdle = () => { lastActivityRef.current = Date.now(); setIdleWarning(false); };
    resetIdle();
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }));

    const tick = setInterval(() => {
      const idle = Date.now() - (lastActivityRef.current ?? Date.now());
      const remaining = IDLE_TIMEOUT - idle;
      if (remaining <= 0) {
        clearInterval(tick);
        fetch("/api/admin/auth", { method: "DELETE" }).finally(() => {
          router.push("/admin/login");
        });
      } else if (remaining <= WARN_BEFORE) {
        setIdleWarning(true);
        setIdleMinsLeft(Math.ceil(remaining / 60_000));
      } else {
        setIdleWarning(false);
      }
    }, 15_000); // check every 15 seconds

    return () => {
      clearInterval(tick);
      events.forEach((e) => window.removeEventListener(e, resetIdle));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Inventory state ── */
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

  /* ── Model Descriptions state ── */
  const [descs, setDescs] = useState<Record<string, DescRow>>({});
  const [descLoading, setDescLoading] = useState(false);
  const [editingType, setEditingType] = useState<string | null>(null);
  const [descForm, setDescForm] = useState<Omit<DescRow, "model_type">>(EMPTY_DESC);
  const [descSaving, setDescSaving] = useState(false);
  const [descMsg, setDescMsg] = useState("");
  const [descSeeding, setDescSeeding] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/inventory");
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) throw new Error("Failed to load inventory");
      const rows: InventoryItem[] = await res.json();
      setItems(rows.map((item) => ({ ...item, building_material: item.building_material ?? "" })));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchItems(); }, [fetchItems]);

  /* Auto-generate slug from model + size when adding (not editing) */
  useEffect(() => {
    if (!editItem && form.model_type && form.size) {
      const slug = `${form.model_type}-${form.size}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((f) => ({ ...f, slug }));
    }
  }, [form.model_type, form.size, editItem]);

  const openAdd = () => {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (item: InventoryItem) => {
    setEditItem(item);
    setForm({
      ...item,
      building_material: item.building_material ?? "",
      ...calculateRto(item.cash_price),
    });
    setShowForm(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "is_on_sale" && !checked ? { sale_price: null } : {}),
    }));
  };

  const handleCashPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cashPrice = e.target.value;
    setForm((current) => ({
      ...current,
      cash_price: cashPrice,
      ...calculateRto(cashPrice),
    }));
  };

  const formatPriceField = (field: "cash_price" | "sale_price") => {
    setForm((current) => {
      const amount = parseCurrency(current[field]);
      return amount > 0 ? { ...current, [field]: formatCurrency(amount) } : current;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    setError("");
    try {
      const uploadFile = await preparePhotoForUpload(file);
      const fd = new FormData();
      fd.append("file", uploadFile);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const body = await res.json().catch(() => ({
        error: "The photo could not be uploaded. Please try a smaller photo.",
      }));
      if (!res.ok) throw new Error(body.error ?? "Upload failed");
      setForm((f) => ({ ...f, image_url: body.url }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setImageUploading(false);
      // Reset the input so the same file can be re-selected if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        width: Number(form.width),
        length: Number(form.length),
        designer_template: Number(form.designer_template),
        sort_order: Number(form.sort_order),
        sale_price: form.is_on_sale ? form.sale_price : null,
      };
      const url = editItem
        ? `/api/admin/inventory/${editItem.id}`
        : "/api/admin/inventory";
      const method = editItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Save failed");
      }
      setShowForm(false);
      setEditItem(null);
      fetchItems();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/inventory/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchItems();
    } catch {
      setError("Delete failed.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const handleSeed = async () => {
    if (!confirm("This will import missing inventory from the static buildings list. Existing inventory will not be changed. Continue?")) return;
    setSeeding(true);
    setSeedMsg("");
    setError("");
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Seed failed");
      setSeedMsg(`✓ Imported ${body.seeded} items into Supabase.`);
      fetchItems();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSeeding(false);
    }
  };

  const fetchDescs = useCallback(async (): Promise<Record<string, DescRow>> => {
    setDescLoading(true);
    try {
      const res = await fetch("/api/admin/model-descriptions");
      if (!res.ok) return {};
      const rows: DescRow[] = await res.json();
      const map: Record<string, DescRow> = {};
      rows.forEach((r) => { map[r.model_type] = r; });
      setDescs(map);
      return map;
    } finally {
      setDescLoading(false);
    }
  }, []);

  const handleTabChange = (nextTab: "inventory" | "descriptions") => {
    setTab(nextTab);
    if (nextTab === "descriptions") void fetchDescs();
  };

  const openEditDesc = (modelType: string) => {
    const r = descs[modelType];
    setDescForm(r
      ? { heading: r.heading, body: r.body, bullets: r.bullets, sizes_image_url: r.sizes_image_url }
      : { ...EMPTY_DESC }
    );
    setEditingType(modelType);
    setDescMsg("");
  };

  const handleSeedDescs = async () => {
    if (!confirm("Import all default descriptions from the static data? This will fill in any empty fields but won't overwrite descriptions you've already saved.")) return;
    setDescSeeding(true);
    setDescMsg("");
    try {
      const res = await fetch("/api/admin/seed-descriptions", { method: "POST" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Seed failed");
      setDescMsg(`✓ Imported ${body.seeded} model descriptions. Click any model on the left to edit it.`);
      const freshMap = await fetchDescs();
      // If editor is already open, refresh its form with the imported data
      if (editingType && freshMap[editingType]) {
        const r = freshMap[editingType];
        setDescForm({ heading: r.heading, body: r.body, bullets: r.bullets, sizes_image_url: r.sizes_image_url });
      }
    } catch (e) {
      setDescMsg((e as Error).message);
    } finally {
      setDescSeeding(false);
    }
  };

  const handleSaveDesc = async () => {
    if (!editingType) return;
    setDescSaving(true);
    setDescMsg("");
    try {
      const res = await fetch("/api/admin/model-descriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_type: editingType, ...descForm }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Save failed");
      setDescs((d) => ({ ...d, [editingType]: { model_type: editingType, ...descForm } }));
      setDescMsg("✓ Saved. Building pages will update within 60 seconds.");
    } catch (e) {
      setDescMsg((e as Error).message);
    } finally {
      setDescSaving(false);
    }
  };

  const filtered = items.filter((i) =>
    search
      ? [i.model_type, i.size, i.inventory_number, i.wall_color]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      : true
  );

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerBrand}>
          <Image src="/logo.png" alt="Legacy Structures" width={44} height={42} />
          <div>
            <div className={styles.brandName}>Legacy Structures</div>
            <div className={styles.brandSubtitle}>Inventory Admin</div>
          </div>
        </div>
        <div className={styles.headerActions}>
          <a href="/" target="_blank" rel="noopener noreferrer" className={styles.viewSite}>
            View Site ↗
          </a>
          <button onClick={handleLogout} className={cx(styles.button, styles.buttonHeader)}>
            Log Out
          </button>
        </div>
      </div>

      {/* Tab nav */}
      <div className={styles.tabs}>
        {(["inventory", "descriptions"] as const).map((t) => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            className={cx(styles.tab, tab === t && styles.tabActive)}
          >
            {t === "inventory" ? "Inventory" : "Model Descriptions"}
          </button>
        ))}
      </div>

      {/* Idle-timeout warning banner */}
      {idleWarning && (
        <div className={styles.idleWarning}>
          <span className={styles.idleText}>
            ⚠ You&apos;ve been inactive — you will be automatically logged out in <strong>{idleMinsLeft} minute{idleMinsLeft !== 1 ? "s" : ""}</strong>. Move your mouse or press any key to stay logged in.
          </span>
          <button
            type="button"
            onClick={() => { lastActivityRef.current = Date.now(); setIdleWarning(false); }}
            className={styles.buttonStayLoggedIn}
          >
            Stay Logged In
          </button>
        </div>
      )}

      {/* ── Model Descriptions Tab ── */}
      {tab === "descriptions" && (
        <div className={styles.page}>
          <div className={styles.sectionHeader}>
            <div>
              <h1 className={styles.pageTitle}>Model Descriptions</h1>
              <p className={styles.pageSubtitle}>
                Edit the heading, body text, and bullet points shown on every building detail page for each model type.
              </p>
            </div>
            <button
              onClick={handleSeedDescs}
              disabled={descSeeding}
              className={cx(styles.button, styles.buttonImport)}
            >
              {descSeeding ? "Importing…" : "⬇ Import Defaults"}
            </button>
          </div>

          {descLoading && <div className={cx(styles.loading, styles.descriptionLoading)}>Loading…</div>}

          {descMsg && (
            <div className={cx(styles.message, styles.descriptionMessage, descMsg.startsWith("✓") ? styles.messageSuccess : styles.messageError)}>
              {descMsg}
            </div>
          )}

          {/* Two-column layout: model list on left, editor on right */}
          <div className={styles.descriptionLayout}>
            {/* Model type list */}
            <div className={styles.modelList}>
              {ALL_MODEL_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => openEditDesc(t)}
                  className={cx(styles.modelButton, editingType === t && styles.modelButtonActive)}
                >
                  {t}
                  {descs[t] ? (
                    <span className={cx(styles.status, styles.statusSaved)}>saved</span>
                  ) : (
                    <span className={cx(styles.status, styles.statusDefault)}>default</span>
                  )}
                </button>
              ))}
            </div>

            {/* Editor panel */}
            {editingType ? (
              <div className={styles.editor}>
                <h2 className={styles.editorTitle}>
                  Editing: {editingType}
                </h2>

                <div className={styles.editorForm}>
                  <div>
                    <label htmlFor="d-heading" className={styles.label}>Section Heading</label>
                    <input
                      id="d-heading"
                      value={descForm.heading}
                      onChange={(e) => setDescForm((f) => ({ ...f, heading: e.target.value }))}
                      placeholder={`THE BASICS OF OUR ${editingType.toUpperCase()} BUILDINGS`}
                      className={styles.input}
                    />
                    <p className={styles.helpText}>Leave blank to use the default heading.</p>
                  </div>

                  <div>
                    <label htmlFor="d-body" className={styles.label}>Body Text</label>
                    <textarea
                      id="d-body"
                      value={descForm.body}
                      onChange={(e) => setDescForm((f) => ({ ...f, body: e.target.value }))}
                      rows={4}
                      placeholder="Describe this building type…"
                      className={cx(styles.input, styles.textarea)}
                    />
                  </div>

                  <div>
                    <label htmlFor="d-bullets" className={styles.label}>Bullet Points</label>
                    <textarea
                      id="d-bullets"
                      value={descForm.bullets}
                      onChange={(e) => setDescForm((f) => ({ ...f, bullets: e.target.value }))}
                      rows={5}
                      placeholder={"One bullet per line:\nClassic gable-style roof\nUpgradeable sidewalls up to 8' tall"}
                      className={cx(styles.input, styles.textarea, styles.textareaCode)}
                    />
                    <p className={styles.helpText}>Enter each bullet on its own line.</p>
                  </div>

                  <div>
                    <label htmlFor="d-image" className={styles.label}>Section Image URL <span className={styles.labelNote}>(optional — the illustration beside the text)</span></label>
                    <input
                      id="d-image"
                      value={descForm.sizes_image_url}
                      onChange={(e) => setDescForm((f) => ({ ...f, sizes_image_url: e.target.value }))}
                      placeholder="https://…"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.buttonRow}>
                    <button onClick={() => setEditingType(null)} className={styles.button}>Cancel</button>
                    <button
                      onClick={handleSaveDesc}
                      disabled={descSaving}
                      className={styles.buttonPrimary}
                    >
                      {descSaving ? "Saving…" : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.editorEmpty}>
                ← Select a model type from the list to edit its description
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Inventory Tab ── */}
      {tab === "inventory" && <div className={styles.page}>
        {/* Top bar */}
        <div className={styles.sectionHeader}>
          <div>
            <h1 className={styles.pageTitle}>Inventory Management</h1>
            <p className={styles.pageSubtitle}>
              {items.length} item{items.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <div className={styles.toolbar}>
            <input
              type="search"
              aria-label="Search inventory"
              placeholder="Search inventory…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cx(styles.input, styles.search)}
            />
            <button
              onClick={handleSeed}
              disabled={seeding}
              title="Import missing inventory from buildings.ts into Supabase"
              className={cx(styles.button, styles.buttonImport)}
            >
              {seeding ? "Importing…" : "⬇ Import from Static"}
            </button>
            <button onClick={openAdd} className={cx(styles.buttonPrimary, styles.buttonNowrap)}>
              + Add Item
            </button>
          </div>
        </div>

        {seedMsg && (
          <div className={cx(styles.message, styles.messageSuccess, styles.inventoryMessage)}>
            {seedMsg}
          </div>
        )}

        {error && (
          <div className={cx(styles.message, styles.messageError, styles.inventoryError)}>
            {error}
          </div>
        )}

        {/* Inventory Table */}
        {loading ? (
          <div className={styles.loading}>Loading inventory…</div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            {search ? "No items match your search." : "No inventory items yet. Click \"+ Add Item\" to get started."}
          </div>
        ) : (
          <div className={styles.itemList}>
            {filtered.map((item) => (
              <div key={item.id} className={styles.item}>
                {/* Thumbnail */}
                <div className={styles.thumbnail}>
                  <AdminInventoryPhoto
                    key={`${item.id}-${item.image_url}`}
                    source={item.image_url}
                    slug={item.slug}
                    modelType={item.model_type}
                    alt={`${item.model_type} ${item.size}`}
                    className={styles.thumbnailImage}
                  />
                </div>

                {/* Details */}
                <div className={styles.itemDetails}>
                  <div className={styles.itemType}>{item.model_type}</div>
                  <div className={styles.itemMeta}>
                    {item.size}{item.building_material ? ` • ${item.building_material}` : ""} &bull; {item.wall_color} / {item.trim_color} / {item.roof_color}
                  </div>
                  <div className={styles.itemNumber}>#{item.inventory_number}</div>
                </div>

                {/* Pricing */}
                <div className={styles.pricing}>
                  {item.is_on_sale && item.sale_price ? (
                    <>
                      <div className={styles.oldPrice}>{item.cash_price}</div>
                      <div className={styles.salePrice}>{item.sale_price}</div>
                      <div className={styles.saleTag}>SALE</div>
                    </>
                  ) : (
                    <div className={styles.price}>{item.cash_price}</div>
                  )}
                  <div className={styles.itemLink}>
                    <a href={getModelRoute(item.model_type)} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {getModelRoute(item.model_type)} ↗
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                  <button onClick={() => openEdit(item)} className={styles.button}>Edit</button>
                  {deleteConfirm === item.id ? (
                    <div className={styles.deleteConfirm}>
                      <span className={styles.deleteText}>Delete?</span>
                      <button onClick={() => handleDelete(item.id)} className={styles.buttonDanger}>Yes</button>
                      <button onClick={() => setDeleteConfirm(null)} className={styles.button}>No</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(item.id)} className={styles.buttonDanger}>Delete</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>}

      {/* Add / Edit Form Modal */}
      {showForm && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editItem ? "Edit Inventory Item" : "Add New Inventory Item"}
              </h2>
              <button onClick={() => setShowForm(false)} className={cx(styles.button, styles.buttonClose)} aria-label="Close form">✕</button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Row 1: Model + Size */}
              <div className={styles.gridTwo}>
                <div>
                  <label htmlFor="f-model" className={styles.label}>Building Type *</label>
                  <select id="f-model" name="model_type" value={form.model_type} onChange={handleChange} required className={styles.input}>
                    <option value="">Select type…</option>
                    {ALL_MODEL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="f-size" className={styles.label}>Size *</label>
                  <input id="f-size" name="size" value={form.size} onChange={handleChange} required placeholder="e.g. 12 x 20" className={styles.input} />
                </div>
              </div>

              {/* Row 2: Width + Length + Designer Template */}
              <div className={styles.gridThree}>
                <div>
                  <label htmlFor="f-width" className={styles.label}>Width (ft)</label>
                  <input id="f-width" name="width" type="number" value={form.width} onChange={handleChange} className={styles.input} />
                </div>
                <div>
                  <label htmlFor="f-length" className={styles.label}>Length (ft)</label>
                  <input id="f-length" name="length" type="number" value={form.length} onChange={handleChange} className={styles.input} />
                </div>
                <div>
                  <label htmlFor="f-designer" className={styles.label}>Designer Template #</label>
                  <input id="f-designer" name="designer_template" type="number" value={form.designer_template} onChange={handleChange} className={styles.input} />
                </div>
              </div>

              <fieldset className={styles.materialBox}>
                <legend className={styles.label}>Building Material</legend>
                <div className={styles.materialOptions}>
                  {MATERIAL_OPTIONS.map((material) => (
                    <label key={material} className={styles.materialLabel}>
                      <input
                        type="radio"
                        name="building_material"
                        value={material}
                        checked={form.building_material === material}
                        onChange={handleChange}
                        className={styles.checkbox}
                      />
                      <span>{material}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Row 3: Colors */}
              <div className={styles.gridThree}>
                <div>
                  <label htmlFor="f-wall" className={styles.label}>Wall Color</label>
                  <input id="f-wall" name="wall_color" value={form.wall_color} onChange={handleChange} className={styles.input} />
                </div>
                <div>
                  <label htmlFor="f-trim" className={styles.label}>Trim Color</label>
                  <input id="f-trim" name="trim_color" value={form.trim_color} onChange={handleChange} className={styles.input} />
                </div>
                <div>
                  <label htmlFor="f-roof" className={styles.label}>Roof Color</label>
                  <input id="f-roof" name="roof_color" value={form.roof_color} onChange={handleChange} className={styles.input} />
                </div>
              </div>

              {/* Row 4: Pricing + Inventory # */}
              <div className={styles.gridTwo}>
                <div>
                  <label htmlFor="f-cash" className={styles.label}>Cash Price *</label>
                  <input id="f-cash" name="cash_price" value={form.cash_price} onChange={handleCashPriceChange} onBlur={() => formatPriceField("cash_price")} inputMode="decimal" required placeholder="e.g. $5,500.00 +tax" className={styles.input} />
                </div>
                <div>
                  <label htmlFor="f-inv" className={styles.label}>Inventory Number</label>
                  <input id="f-inv" name="inventory_number" value={form.inventory_number} onChange={handleChange} className={styles.input} />
                </div>
              </div>

              {/* Sale Toggle */}
              <div className={styles.saleBox}>
                <label className={styles.saleLabel}>
                  <input type="checkbox" name="is_on_sale" checked={form.is_on_sale} onChange={handleChange} className={styles.checkbox} />
                  <span className={styles.saleLabelText}>This item is on sale</span>
                </label>
                {form.is_on_sale && (
                  <div className={styles.salePriceField}>
                    <label htmlFor="f-sale" className={styles.label}>Sale Price</label>
                    <input id="f-sale" name="sale_price" value={form.sale_price ?? ""} onChange={(e) => setForm((f) => ({ ...f, sale_price: e.target.value }))} onBlur={() => formatPriceField("sale_price")} inputMode="decimal" placeholder="e.g. $4,950.00 +tax" className={styles.input} />
                  </div>
                )}
              </div>

              {/* Row 5: RTO */}
              <div className={styles.gridTwo}>
                <div>
                  <label htmlFor="f-rto36" className={styles.label}>36-Mo RTO</label>
                  <input id="f-rto36" name="rto_36" value={form.rto_36} readOnly aria-describedby="rto-help" className={cx(styles.input, styles.readOnlyInput)} />
                </div>
                <div>
                  <label htmlFor="f-rto48" className={styles.label}>48-Mo RTO</label>
                  <input id="f-rto48" name="rto_48" value={form.rto_48} readOnly aria-describedby="rto-help" className={cx(styles.input, styles.readOnlyInput)} />
                </div>
              </div>
              <p id="rto-help" className={styles.helpText}>Calculated automatically from the cash price.</p>

              {/* Image — upload or paste URL */}
              <div>
                <label htmlFor="f-image" className={styles.label}>Photo</label>
                <div className={styles.photoRow}>
                  {/* Hidden file input */}
                  <input
                    id="f-file"
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif"
                    onChange={handleImageUpload}
                    className={styles.fileInput}
                    aria-label="Upload inventory photo"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={imageUploading}
                    className={cx(styles.button, styles.buttonUpload)}
                  >
                    {imageUploading ? "Uploading…" : "⬆ Upload Photo"}
                  </button>
                  <span className={styles.photoHint}>or paste a URL:</span>
                  <input
                    id="f-image"
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                    placeholder="https://…"
                    className={cx(styles.input, styles.imageUrl)}
                  />
                </div>
                {form.image_url && (
                  <div className={styles.previewRow}>
                    <AdminInventoryPhoto
                      key={`${form.slug}-${form.image_url}`}
                      source={form.image_url}
                      slug={form.slug}
                      modelType={form.model_type}
                      alt="Inventory photo preview"
                      className={styles.previewImage}
                    />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, image_url: "" }))}
                      className={cx(styles.button, styles.buttonRemove)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Description / Notes */}
              <div>
                <label htmlFor="f-notes" className={styles.label}>Description / Notes</label>
                <textarea
                  id="f-notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Optional — shown on the public listing and building detail page. e.g. 'On display at our lot. Ready for immediate delivery.'"
                  className={cx(styles.input, styles.textarea)}
                />
              </div>

              {/* Auto-linked model route preview */}
              {form.model_type && (
                <div className={styles.routePreview}>
                  <strong>Auto-link:</strong> This item will link to{" "}
                  <a href={getModelRoute(form.model_type)} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {getModelRoute(form.model_type)}
                  </a>
                </div>
              )}

              {error && (
                <p className={styles.inlineError}>{error}</p>
              )}

              <div className={styles.buttonRow}>
                <button type="button" onClick={() => setShowForm(false)} className={styles.button}>Cancel</button>
                <button type="submit" disabled={saving || imageUploading} className={styles.buttonPrimary}>
                  {saving ? "Saving…" : editItem ? "Save Changes" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
