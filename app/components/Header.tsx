"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/career", label: "Career" },
  { href: "/links", label: "Links" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-base text-gray-900 tracking-tight">
          Kiyomaru
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href
                  ? "text-green-600"
                  : "text-gray-500 hover:text-gray-900 transition-colors"
              }
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
