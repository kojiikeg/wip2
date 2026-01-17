"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navItems } from "./navItems";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function PageHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-green-600 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src={`${basePath}/logo.png`}
              alt="みなみクリニック ロゴ"
              className="w-10 h-10 object-contain rounded-lg"
            />
            <span className="flex flex-wrap gap-x-2 text-lg font-bold">
              <span>リハビリ整形外科</span>
              <span>みなみクリニック</span>
            </span>
          </Link>

          {/* デスクトップメニュー */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-orange-300 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="メニュー"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* モバイルメニュー */}
        {isOpen && (
          <nav className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 hover:text-orange-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
