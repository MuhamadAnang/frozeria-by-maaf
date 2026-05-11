"use client";

import Link from "next/link";
import { Button } from "./_components/ui/button";
import { ArrowRight, BarChart3, CheckCircle2, Package, Star, TrendingUp, ThermometerSnowflake, AlertTriangle, Clock, Users, Snowflake } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./_components/logo";

export default function Page() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Snowflake,
      title: "Monitoring Suhu Real-Time",
      description: "Pantau suhu ruangan freezer dan cold storage secara terus-menerus dengan alert otomatis.",
    },
    {
      icon: Package,
      title: "Manajemen Stok Makanan Beku",
      description: "Kelola stok masuk, keluar, dan saldo barang dengan mudah dan akurat.",
    },
    {
      icon: Clock,
      title: "Pemantauan Kadaluarsa",
      description: "Sistem peringatan otomatis untuk barang mendekati atau sudah kadaluarsa.",
    },
    {
      icon: BarChart3,
      title: "Dashboard Real-Time",
      description: "Visualisasi stok, nilai inventory, dan status barang secara langsung.",
    },
    {
      icon: AlertTriangle,
      title: "Low Stock & Alert",
      description: "Notifikasi otomatis saat stok mendekati minimum atau ada masalah suhu.",
    },
    {
      icon: TrendingUp,
      title: "Laporan & Analitik",
      description: "Laporan lengkap penjualan, konsumsi, dan rotasi barang makanan beku.",
    },
  ];

  const benefits = [
    "Mengurangi risiko kerusakan barang hingga 95%",
    "Meminimalkan stok mati (expired)",
    "Pantau stok dari mana saja secara real-time",
    "Pengambilan keputusan lebih cepat dan akurat",
    "Menghemat biaya inventory dan waste",
    "Laporan lengkap untuk audit dan analisis bisnis",
  ];

  const stats = [
    { label: "Produk Beku Terkelola", value: "500+", suffix: "", delay: 0 },
    { label: "Cold Storage Terpantau", value: "25+", suffix: "", delay: 200 },
    { label: "Admin Aktif", value: "50+", suffix: "", delay: 400 },
    { label: "Akurasi Stok", value: "99", suffix: "%", delay: 600 },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Navbar */}
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo className="h-15 w-45" />
          </div>
          <div className="flex gap-3">
            <Link href="/sign-in">
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                Masuk Admin
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <ThermometerSnowflake className="w-4 h-4" />
              <span>Inventory & Cold Storage Monitoring</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Kelola Stok Makanan Beku{" "}
              <span className="bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Lebih Mudah & Aman
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Frozerify adalah platform khusus untuk admin Frozeria. Pantau stok makanan beku, suhu cold storage, 
              dan kelola inventory secara real-time dengan mudah dan akurat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/sign-in">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-lg px-8">
                  Masuk ke Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="space-y-4">
                <div className="bg-linear-to-r from-cyan-600 to-blue-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <ThermometerSnowflake className="w-6 h-6" />
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">Suhu Normal</span>
                  </div>
                  <p className="text-sm font-semibold">-18°C • Daging Ayam</p>
                  <p className="text-xs opacity-90">Cold Storage A1 • Status: Aman</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-5 h-5 text-cyan-600" />
                    <span className="font-semibold text-sm">Stok: 2.450 kg</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full w-4/5"></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Minimum stok: 500 kg</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Peringatan</p>
                    <p className="font-semibold text-sm text-amber-600">15 produk mendekati expired</p>
                  </div>
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-16 bg-white border-y border-gray-100 mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-600">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-gray-600 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Fitur Unggulan Frozerify
              </h2>
              <p className="text-gray-600 mt-4">
                Solusi lengkap untuk admin dalam memantau stok makanan beku Frozeria
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-24 bg-linear-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Tingkatkan Keamanan & Efisiensi Inventory Frozeria
                </h2>
                <p className="text-cyan-100 mt-4 text-lg">
                  Kelola stok makanan beku dengan lebih profesional
                </p>
                <div className="mt-8 space-y-3">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-white shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg italic">
                    Frozerify sangat membantu kami memantau stok dan suhu secara real-time. 
                    Waste produk beku turun drastis!
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Admin Frozeria</p>
                      <p className="text-sm text-cyan-200">Pengguna Frozerify</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Siap Memantau Stok Frozeria?
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Masuk ke dashboard admin dan kelola inventory makanan beku dengan lebih baik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/sign-in">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-base px-8">
                  Masuk ke Frozerify
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 rounded-2xl">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Logo className="h-15 w-45" />
                </div>
                <p className="text-sm">
                  Platform monitoring stok makanan beku dan manajemen inventory Frozeria.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Fitur</h4>
                <ul className="space-y-2 text-sm">
                  <li>Monitoring Suhu</li>
                  <li>Manajemen Stok</li>
                  <li>Peringatan Kadaluarsa</li>
                  <li>Laporan Analitik</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Perusahaan</h4>
                <ul className="space-y-2 text-sm">
                  <li>Frozeria</li>
                  <li>Dashboard Admin</li>
                  <li>Support</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Kontak</h4>
                <ul className="space-y-2 text-sm">
                  <li>Email: admin@frozerify.com</li>
                  <li>Web: www.frozerify.com</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
              &copy; {new Date().getFullYear()} Frozerify - Frozeria. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}