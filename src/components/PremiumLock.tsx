import Link from "next/link";
import { Lock, Crown } from "lucide-react";

interface PremiumLockProps {
  title?: string;
  message?: string;
  ctaText?: string;
  ctaHref?: string;
  compact?: boolean;
}

export default function PremiumLock({
  title = "Premium Content",
  message = "Unlock this and all premium content with a Heartcast membership.",
  ctaText = "Go Premium",
  ctaHref = "/premium",
  compact = false,
}: PremiumLockProps) {
  if (compact) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-t from-background via-background/95 to-background/60">
        <Link
          href={ctaHref}
          className="flex flex-col items-center gap-2 text-center px-4"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-semibold text-foreground">
            {ctaText}
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-t from-background via-background/95 to-background/60 backdrop-blur-sm">
      <div className="text-center px-6 max-w-sm">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted mb-5 leading-relaxed">{message}</p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Crown className="w-4 h-4" />
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
