import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const BUCKET = "inventory-images";
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const FILE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Please choose a photo to upload." }, { status: 400 });
    }

    const extension = FILE_EXTENSIONS[file.type];
    if (!extension) {
      return NextResponse.json(
        { error: "Please upload a JPEG, PNG, WebP, or GIF photo." },
        { status: 400 }
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "That photo is too large. Please choose one smaller than 4 MB." },
        { status: 400 }
      );
    }

    // Use a generated, URL-safe path rather than trusting the device filename.
    const filename = `admin/${crypto.randomUUID()}.${extension}`;
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Upload as the verified admin user. The bucket policy grants insert access
    // only to authenticated sessions for this inventory bucket.
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filename, file, {
        cacheControl: "31536000",
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Inventory photo upload failed:", uploadError.message);
      return NextResponse.json(
        { error: "The photo could not be uploaded. Please try again." },
        { status: 500 }
      );
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
    return NextResponse.json({ url: data.publicUrl });
  } catch (error) {
    console.error("Inventory photo upload error:", error);
    return NextResponse.json(
      { error: "The photo could not be uploaded. Please try again." },
      { status: 500 }
    );
  }
}
