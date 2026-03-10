import Link from "next/link";
import {
  Heart,
  Headphones,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Crown,
  Mail,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const footerLinks = {
  podcast: [
    { href: "/episodes", label: "All Episodes" },
    { href: "/episodes?category=Dating", label: "Dating" },
    { href: "/episodes?category=Communication", label: "Communication" },
    { href: "/episodes?category=Intimacy", label: "Intimacy" },
    { href: "/episodes?category=Marriage", label: "Marriage" },
  ],
  explore: [
    { href: "/articles", label: "Articles" },
    { href: "/quizzes", label: "Quizzes" },
    { href: "/confessions", label: "Confessions" },
    { href: "/sex-education", label: "Sex Education" },
    { href: "/premium", label: "Premium Content" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

const socialLinks = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Youtube, label: "YouTube" },
  { href: "#", icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
                Heartcast
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Your go-to podcast for love, relationships, intimacy, and emotional growth.
              Real conversations about real connections.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-muted hover:text-accent hover:bg-border transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Podcast Links */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
              <Headphones className="w-4 h-4 text-primary-light" />
              Podcast
            </h3>
            <ul className="space-y-2">
              {footerLinks.podcast.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
              <BookOpen className="w-4 h-4 text-primary-light" />
              Explore
            </h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
              <Heart className="w-4 h-4 text-primary-light" />
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Heartcast. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Made with <Heart className="w-3 h-3 inline text-accent" fill="currentColor" /> for lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
