import Link from "next/link";
import { navItems } from "./navItems";

export default function DesktopNav() {
  return (
    <nav className="hidden md:block bg-green-600 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex justify-center gap-8 py-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-orange-300 transition-colors py-2"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
