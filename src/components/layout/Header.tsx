"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, Heart, Library, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: ShoppingCart },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/library", label: "Library", icon: Library },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="hidden md:flex items-center justify-between p-4 border-b bg-background sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
        <BookOpen className="h-6 w-6" />
        ScholarSage
      </Link>
      <nav className="flex gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.label} legacyBehavior passHref>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className={cn(isActive && "font-semibold")}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
