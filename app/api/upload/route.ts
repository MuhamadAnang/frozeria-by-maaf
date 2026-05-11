// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { existsSync } from "fs";
import { mkdir } from "fs/promises";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "File type not allowed. Use JPEG, PNG, or WEBP" },
        { status: 400 }
      );
    }

    // Validasi ukuran (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File too large. Max 5MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Buat unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const originalName = file.name.replace(/\s/g, "");
    const filename = `${timestamp}-${randomStr}-${originalName}`;
    
    // Tentukan path penyimpanan
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    // Buat directory jika belum ada
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    
    // Compress image dengan sharp
    await sharp(buffer)
      .resize(800, 800, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(filePath);

    // Return URL yang bisa diakses
    const imageUrl = `/uploads/${filename}`;
    
    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      data: { url: imageUrl },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}