"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Heart,
  Headphones,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Crown,
  Search,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/episodes", label: "Episodes", icon: Headphones },
  { href: "/story-mode", label: "Story Mode", icon: Sparkles },
  { href: "/articles", label: "Articles", icon: BookOpen },
  { href: "/quizzes", label: "Quizzes", icon: HelpCircle },
  { href: "/confessions", label: "Confessions", icon: MessageSquare },
  { href: "/ask", label: "Q&A", icon: HelpCircle },
  { href: "/premium", label: "Premium", icon: Crown },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
              Heartcast
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-surface transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              aria-label="Search"
              className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/premium"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Crown className="w-4 h-4" />
              Subscribe
            </Link>
            <button
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-muted hover:text-foreground hover:bg-surface transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/premium"
              className="flex items-center justify-center gap-2 mt-3 px-4 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              <Crown className="w-4 h-4" />
              Subscribe Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
