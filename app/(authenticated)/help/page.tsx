"use client";

import Page from "@/app/_components/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { useBreadcrumb } from "@/app/_contexts/breadcrumb.context";
import { useEffect } from "react";
import { HelpCircle, User, Mail, Phone } from "lucide-react";

export default function HelpPage() {
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/dashboard" },
      { label: "Bantuan" }
    ]);
  }, [setBreadcrumbs]);

  return (
    <Page
      title="Panduan Penggunaan Sistem"
      description="Bantuan dan informasi untuk menggunakan sistem inventory frozerify."
    >
      <div className="space-y-6">
        {/* Panduan Penggunaan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Panduan Penggunaan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Cara menambahkann barang</h3>
              <p className="text-sm text-muted-foreground">
                1. Buka halaman Dashboard, klilk tombol + Tambah Barang di kanan atas.
              </p>
              <p className="text-sm text-muted-foreground">
                2. Unggah foto barang (opsional), lalu isi formulir, nama, kategori, satuan, jumlah stok, harga, dan lainnya.
              </p>
              <p className="text-sm text-muted-foreground">
                3. Klik simpan barang barang akan muncul di daftar dashboard.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cara Update Stok Barang Masuk</h3>
              <p className="text-sm text-muted-foreground">
                1. Temukan barang di dashboard menggunakan kolom pencarian atau filter kategori.
              </p>
              <p className="text-sm text-muted-foreground">
                2. Klik tombol Edit pada baris barang tersebut.
              </p>
              <p className="text-sm text-muted-foreground">
                3. Ubah nilai Jumlah Stok sesuai kondisi saat ini, lalu klik simpan barang
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cara Mengelola Kategori</h3>
              <p className="text-sm text-muted-foreground">
              1. Buka Halaman Kategori dari navigasi atas 
              </p>
              <p className="text-sm text-muted-foreground">
              2. Tambah, edit, atau hapus kategori sesuai kebutuhan toko.
              </p>
              <p className="text-sm text-muted-foreground">
              3. Menghapus kategori tidak akan menghilangkan barang - barang akan menjadi tidak berkategori.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Satuan barang diisi bebas sesuai kebutuhan - misalnya : pcs, pack, box, kg, liter, dan lain lain.  </h3>
              
            </div>
          </CardContent>
        </Card>

        {/* Informasi Kontak */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informasi Pemilik
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Muhammad Anang</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">ananghunusl10@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">+62 852-5891-6440</span>
            </div>
          </CardContent>
        </Card>

        {/* Tips Penggunaan */}
        <Card>
          <CardHeader>
            <CardTitle>Tips Penggunaan Sistem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Selalu update stok saat menerima barang baru atau menjual barang</li>
              <li>• Gunakan foto barang untuk memudahkan identifikasi</li>
              <li>• Periksa dashboard setiap hari untuk melihat peringatan stok</li>
              <li>• Pastikan kategori sudah dibuat sebelum menambah barang baru</li>
              <li>• Gunakan fitur pencarian untuk menemukan barang dengan cepat</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}