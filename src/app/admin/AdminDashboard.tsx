"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ALL_MODEL_TYPES, getModelRoute } from "@/lib/model-routes";

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
};

/* ── Style helpers ── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  border: "1.5px solid #d1d5db",
  borderRadius: 6,
  fontSize: 14,
  color: "#1a1a1a",
  boxSizing: "border-box",
  background: "#fff",
};
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 700,
  color: "#1a3a5c",
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};
const btnPrimary: React.CSSProperties = {
  background: "#1a3a5c",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "10px 20px",
  fontWeight: 700,
  fontSize: 13,
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};
const btnDanger: React.CSSProperties = {
  background: "#c0392b",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "8px 14px",
  fontWeight: 700,
  fontSize: 12,
  cursor: "pointer",
};
const btnGhost: React.CSSProperties = {
  background: "transparent",
  color: "#5a6c7e",
  border: "1.5px solid #d1d5db",
  borderRadius: 6,
  padding: "8px 14px",
  fontWeight: 600,
  fontSize: 12,
  cursor: "pointer",
};

/* ── Main Component ── */
export default function AdminDashboard() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tab, setTab] = useState<"inventory" | "descriptions">("inventory");

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

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/inventory");
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) throw new Error("Failed to load inventory");
      setItems(await res.json());
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
    setForm({ ...item });
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const body = await res.json();
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
    if (!confirm("This will import all inventory from the static buildings list into Supabase. Existing items with the same slug will be updated. Continue?")) return;
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

  const fetchDescs = useCallback(async () => {
    setDescLoading(true);
    try {
      const res = await fetch("/api/admin/model-descriptions");
      if (!res.ok) return;
      const rows: DescRow[] = await res.json();
      const map: Record<string, DescRow> = {};
      rows.forEach((r) => { map[r.model_type] = r; });
      setDescs(map);
    } finally {
      setDescLoading(false);
    }
  }, []);

  useEffect(() => { if (tab === "descriptions") fetchDescs(); }, [tab, fetchDescs]);

  const openEditDesc = (modelType: string) => {
    const existing = descs[modelType];
    setDescForm(existing ? {
      heading: existing.heading,
      body: existing.body,
      bullets: existing.bullets,
      sizes_image_url: existing.sizes_image_url,
    } : { ...EMPTY_DESC });
    setEditingType(modelType);
    setDescMsg("");
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
    <div style={{ minHeight: "100vh", background: "#f7f5f2", fontFamily: "Arial, Helvetica, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#1a3a5c", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Image src="/logo.png" alt="Legacy Structures" width={44} height={42} />
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>Legacy Structures</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>Inventory Admin</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, textDecoration: "none" }}>
            View Site ↗
          </a>
          <button onClick={handleLogout} style={{ ...btnGhost, color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>
            Log Out
          </button>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ background: "#132d47", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: 0 }}>
        {(["inventory", "descriptions"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "12px 24px",
              background: "none",
              border: "none",
              borderBottom: tab === t ? "3px solid #ffc400" : "3px solid transparent",
              color: tab === t ? "#fff" : "rgba(255,255,255,0.55)",
              fontWeight: tab === t ? 700 : 500,
              fontSize: 13,
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {t === "inventory" ? "Inventory" : "Model Descriptions"}
          </button>
        ))}
      </div>

      {/* ── Model Descriptions Tab ── */}
      {tab === "descriptions" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ color: "#1a3a5c", fontSize: 24, fontWeight: 700, margin: 0 }}>Model Descriptions</h1>
            <p style={{ color: "#5a6c7e", fontSize: 14, margin: "4px 0 0" }}>
              Edit the heading, body text, and bullet points shown on every building detail page for each model type.
            </p>
          </div>

          {descLoading && <div style={{ color: "#5a6c7e", padding: 40, textAlign: "center" }}>Loading…</div>}

          {descMsg && (
            <div style={{ background: descMsg.startsWith("✓") ? "#f0fdf4" : "#fef2f2", border: `1px solid ${descMsg.startsWith("✓") ? "#86efac" : "#fca5a5"}`, borderRadius: 8, padding: "12px 16px", color: descMsg.startsWith("✓") ? "#15803d" : "#c0392b", fontSize: 14, marginBottom: 16 }}>
              {descMsg}
            </div>
          )}

          {/* Two-column layout: model list on left, editor on right */}
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 24, alignItems: "flex-start" }}>
            {/* Model type list */}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
              {ALL_MODEL_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => openEditDesc(t)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "12px 16px",
                    textAlign: "left",
                    background: editingType === t ? "#f0f9ff" : "transparent",
                    border: "none",
                    borderBottom: "1px solid #f3f4f6",
                    borderLeft: editingType === t ? "3px solid #1a3a5c" : "3px solid transparent",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: editingType === t ? 700 : 500,
                    color: "#1a3a5c",
                  }}
                >
                  {t}
                  {descs[t] ? (
                    <span style={{ float: "right", fontSize: 10, background: "#dcfce7", color: "#15803d", borderRadius: 4, padding: "2px 6px" }}>saved</span>
                  ) : (
                    <span style={{ float: "right", fontSize: 10, color: "#9ca3af" }}>default</span>
                  )}
                </button>
              ))}
            </div>

            {/* Editor panel */}
            {editingType ? (
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "24px 28px" }}>
                <h2 style={{ color: "#1a3a5c", fontSize: 18, fontWeight: 700, margin: "0 0 20px" }}>
                  Editing: {editingType}
                </h2>

                <div style={{ display: "grid", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Section Heading</label>
                    <input
                      value={descForm.heading}
                      onChange={(e) => setDescForm((f) => ({ ...f, heading: e.target.value }))}
                      placeholder={`THE BASICS OF OUR ${editingType.toUpperCase()} BUILDINGS`}
                      style={inputStyle}
                    />
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 0" }}>Leave blank to use the default heading.</p>
                  </div>

                  <div>
                    <label style={labelStyle}>Body Text</label>
                    <textarea
                      value={descForm.body}
                      onChange={(e) => setDescForm((f) => ({ ...f, body: e.target.value }))}
                      rows={4}
                      placeholder="Describe this building type…"
                      style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Bullet Points</label>
                    <textarea
                      value={descForm.bullets}
                      onChange={(e) => setDescForm((f) => ({ ...f, bullets: e.target.value }))}
                      rows={5}
                      placeholder={"One bullet per line:\nClassic gable-style roof\nUpgradeable sidewalls up to 8' tall"}
                      style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5, fontFamily: "monospace" }}
                    />
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 0" }}>Enter each bullet on its own line.</p>
                  </div>

                  <div>
                    <label style={labelStyle}>Section Image URL <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional — the illustration beside the text)</span></label>
                    <input
                      value={descForm.sizes_image_url}
                      onChange={(e) => setDescForm((f) => ({ ...f, sizes_image_url: e.target.value }))}
                      placeholder="https://…"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", paddingTop: 8 }}>
                    <button onClick={() => setEditingType(null)} style={btnGhost}>Cancel</button>
                    <button
                      onClick={handleSaveDesc}
                      disabled={descSaving}
                      style={{ ...btnPrimary, opacity: descSaving ? 0.7 : 1, cursor: descSaving ? "not-allowed" : "pointer" }}
                    >
                      {descSaving ? "Saving…" : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ background: "#f7f5f2", border: "1px solid #e5e7eb", borderRadius: 10, padding: 40, textAlign: "center", color: "#9ca3af" }}>
                ← Select a model type from the list to edit its description
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Inventory Tab ── */}
      {tab === "inventory" && <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ color: "#1a3a5c", fontSize: 24, fontWeight: 700, margin: 0 }}>Inventory Management</h1>
            <p style={{ color: "#5a6c7e", fontSize: 14, margin: "4px 0 0" }}>
              {items.length} item{items.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <input
              type="search"
              placeholder="Search inventory…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, width: 220 }}
            />
            <button
              onClick={handleSeed}
              disabled={seeding}
              title="Import all inventory from buildings.ts into Supabase"
              style={{ ...btnGhost, background: "#f0fdf4", borderColor: "#86efac", color: "#15803d", whiteSpace: "nowrap", opacity: seeding ? 0.6 : 1, cursor: seeding ? "not-allowed" : "pointer" }}
            >
              {seeding ? "Importing…" : "⬇ Import from Static"}
            </button>
            <button onClick={openAdd} style={{ ...btnPrimary, whiteSpace: "nowrap" }}>
              + Add Item
            </button>
          </div>
        </div>

        {seedMsg && (
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "12px 16px", color: "#15803d", fontSize: 14, marginBottom: 12 }}>
            {seedMsg}
          </div>
        )}

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "12px 16px", color: "#c0392b", fontSize: 14, marginBottom: 20 }}>
            {error}
          </div>
        )}

        {/* Inventory Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#5a6c7e" }}>Loading inventory…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80, color: "#9ca3af" }}>
            {search ? "No items match your search." : "No inventory items yet. Click \"+ Add Item\" to get started."}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {filtered.map((item) => (
              <div key={item.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px 20px", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                {/* Thumbnail */}
                <div style={{ width: 80, height: 68, borderRadius: 6, overflow: "hidden", background: "#f3f4f6", flexShrink: 0, position: "relative" }}>
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.model_type}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: 11 }}>No image</div>
                  )}
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1a3a5c" }}>{item.model_type}</div>
                  <div style={{ fontSize: 13, color: "#5a6c7e", marginTop: 2 }}>
                    {item.size} &bull; {item.wall_color} / {item.trim_color} / {item.roof_color}
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>#{item.inventory_number}</div>
                </div>

                {/* Pricing */}
                <div style={{ textAlign: "right", minWidth: 130 }}>
                  {item.is_on_sale && item.sale_price ? (
                    <>
                      <div style={{ fontSize: 12, color: "#9ca3af", textDecoration: "line-through" }}>{item.cash_price}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b" }}>{item.sale_price}</div>
                      <div style={{ fontSize: 11, background: "#fef2f2", color: "#c0392b", borderRadius: 4, padding: "2px 6px", display: "inline-block", marginTop: 2 }}>SALE</div>
                    </>
                  ) : (
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1a3a5c" }}>{item.cash_price}</div>
                  )}
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                    <a href={getModelRoute(item.model_type)} target="_blank" rel="noopener noreferrer" style={{ color: "#006580" }}>
                      {getModelRoute(item.model_type)} ↗
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button onClick={() => openEdit(item)} style={btnGhost}>Edit</button>
                  {deleteConfirm === item.id ? (
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#c0392b" }}>Delete?</span>
                      <button onClick={() => handleDelete(item.id)} style={btnDanger}>Yes</button>
                      <button onClick={() => setDeleteConfirm(null)} style={btnGhost}>No</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(item.id)} style={btnDanger}>Delete</button>
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
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "24px 16px", overflowY: "auto" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div style={{ background: "#fff", borderRadius: 12, padding: "32px 28px", maxWidth: 700, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ color: "#1a3a5c", fontSize: 20, fontWeight: 700, margin: 0 }}>
                {editItem ? "Edit Inventory Item" : "Add New Inventory Item"}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ ...btnGhost, padding: "6px 10px", fontSize: 16 }}>✕</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
              {/* Row 1: Model + Size */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label htmlFor="f-model" style={labelStyle}>Building Type *</label>
                  <select id="f-model" name="model_type" value={form.model_type} onChange={handleChange} required style={inputStyle}>
                    <option value="">Select type…</option>
                    {ALL_MODEL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="f-size" style={labelStyle}>Size *</label>
                  <input id="f-size" name="size" value={form.size} onChange={handleChange} required placeholder="e.g. 12 x 20" style={inputStyle} />
                </div>
              </div>

              {/* Row 2: Width + Length + Designer Template */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div>
                  <label htmlFor="f-width" style={labelStyle}>Width (ft)</label>
                  <input id="f-width" name="width" type="number" value={form.width} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="f-length" style={labelStyle}>Length (ft)</label>
                  <input id="f-length" name="length" type="number" value={form.length} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="f-designer" style={labelStyle}>Designer Template #</label>
                  <input id="f-designer" name="designer_template" type="number" value={form.designer_template} onChange={handleChange} style={inputStyle} />
                </div>
              </div>

              {/* Row 3: Colors */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div>
                  <label htmlFor="f-wall" style={labelStyle}>Wall Color</label>
                  <input id="f-wall" name="wall_color" value={form.wall_color} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="f-trim" style={labelStyle}>Trim Color</label>
                  <input id="f-trim" name="trim_color" value={form.trim_color} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="f-roof" style={labelStyle}>Roof Color</label>
                  <input id="f-roof" name="roof_color" value={form.roof_color} onChange={handleChange} style={inputStyle} />
                </div>
              </div>

              {/* Row 4: Pricing + Inventory # */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label htmlFor="f-cash" style={labelStyle}>Cash Price *</label>
                  <input id="f-cash" name="cash_price" value={form.cash_price} onChange={handleChange} required placeholder="e.g. $5,500.00 +tax" style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="f-inv" style={labelStyle}>Inventory Number</label>
                  <input id="f-inv" name="inventory_number" value={form.inventory_number} onChange={handleChange} style={inputStyle} />
                </div>
              </div>

              {/* Sale Toggle */}
              <div style={{ background: "#f7f5f2", borderRadius: 8, padding: "14px 16px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <input type="checkbox" name="is_on_sale" checked={form.is_on_sale} onChange={handleChange} style={{ width: 16, height: 16, cursor: "pointer" }} />
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#1a3a5c" }}>This item is on sale</span>
                </label>
                {form.is_on_sale && (
                  <div style={{ marginTop: 12 }}>
                    <label htmlFor="f-sale" style={labelStyle}>Sale Price</label>
                    <input id="f-sale" name="sale_price" value={form.sale_price ?? ""} onChange={(e) => setForm((f) => ({ ...f, sale_price: e.target.value }))} placeholder="e.g. $4,950.00 +tax" style={inputStyle} />
                  </div>
                )}
              </div>

              {/* Row 5: RTO */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label htmlFor="f-rto36" style={labelStyle}>36-Mo RTO</label>
                  <input id="f-rto36" name="rto_36" value={form.rto_36} onChange={handleChange} placeholder="e.g. $229.17 +tax" style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="f-rto48" style={labelStyle}>48-Mo RTO</label>
                  <input id="f-rto48" name="rto_48" value={form.rto_48} onChange={handleChange} placeholder="e.g. $206.25 +tax" style={inputStyle} />
                </div>
              </div>

              {/* Image — upload or paste URL */}
              <div>
                <label style={labelStyle}>Photo</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={imageUploading}
                    style={{
                      ...btnGhost,
                      background: "#f0f9ff",
                      borderColor: "#7dd3fc",
                      color: "#0369a1",
                      opacity: imageUploading ? 0.6 : 1,
                      cursor: imageUploading ? "not-allowed" : "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {imageUploading ? "Uploading…" : "⬆ Upload Photo"}
                  </button>
                  <span style={{ color: "#9ca3af", fontSize: 12 }}>or paste a URL:</span>
                  <input
                    id="f-image"
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                    placeholder="https://…"
                    style={{ ...inputStyle, flex: 1, minWidth: 160 }}
                  />
                </div>
                {form.image_url && (
                  <div style={{ marginTop: 10, display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <img
                      src={form.image_url}
                      alt="preview"
                      style={{ height: 80, objectFit: "contain", borderRadius: 6, border: "1px solid #e5e7eb", background: "#f9fafb" }}
                    />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, image_url: "" }))}
                      style={{ ...btnGhost, padding: "4px 8px", fontSize: 11, color: "#c0392b", borderColor: "#fca5a5" }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Description / Notes */}
              <div>
                <label htmlFor="f-notes" style={labelStyle}>Description / Notes</label>
                <textarea
                  id="f-notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Optional — shown on the public listing and building detail page. e.g. 'On display at our lot. Ready for immediate delivery.'"
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
                />
              </div>

              {/* Auto-linked model route preview */}
              {form.model_type && (
                <div style={{ fontSize: 13, color: "#5a6c7e", background: "#f0f9ff", borderRadius: 6, padding: "10px 14px" }}>
                  <strong>Auto-link:</strong> This item will link to{" "}
                  <a href={getModelRoute(form.model_type)} target="_blank" rel="noopener noreferrer" style={{ color: "#006580" }}>
                    {getModelRoute(form.model_type)}
                  </a>
                </div>
              )}

              {error && (
                <p style={{ color: "#c0392b", fontSize: 14, margin: 0 }}>{error}</p>
              )}

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", paddingTop: 8 }}>
                <button type="button" onClick={() => setShowForm(false)} style={btnGhost}>Cancel</button>
                <button type="submit" disabled={saving || imageUploading} style={{ ...btnPrimary, opacity: (saving || imageUploading) ? 0.7 : 1, cursor: (saving || imageUploading) ? "not-allowed" : "pointer" }}>
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
