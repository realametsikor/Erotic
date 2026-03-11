"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ArrowLeft,
  Share2,
  Twitter,
  Facebook,
  Link2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import type { Quiz, QuizResult } from "@/data/content";
import { getRelatedQuizzes } from "@/data/content";

interface Props {
  quiz: Quiz;
  result: QuizResult;
}

export default function ResultsClient({ quiz, result }: Props) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const relatedQuizzes = useMemo(
    () => getRelatedQuizzes(quiz.slug),
    [quiz.slug]
  );

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/quizzes/${quiz.slug}/results?r=${result.id}`
      : "";

  const shareText = `I got "${result.title}" on the ${quiz.title} quiz! Take it yourself:`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-accent/15 via-primary/10 to-background py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link
              href="/"
              className="hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/quizzes"
              className="hover:text-foreground transition-colors"
            >
              Quizzes
            </Link>
            <span>/</span>
            <Link
              href={`/quizzes/${quiz.slug}`}
              className="hover:text-foreground transition-colors"
            >
              {quiz.title}
            </Link>
            <span>/</span>
            <span className="text-foreground">Result</span>
          </nav>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Quiz Result
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">
              {result.title}
            </h1>

            <p className="text-sm text-muted mb-4">{quiz.title}</p>

            <p className="text-muted text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              {result.description}
            </p>

            {/* Traits */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {result.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1.5 rounded-full bg-surface border border-border text-sm text-foreground"
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* Share Card Preview */}
            <div className="max-w-md mx-auto mb-8 p-6 rounded-2xl bg-gradient-to-br from-accent/10 via-surface to-primary/10 border border-border">
              <p className="text-xs text-muted uppercase tracking-wider mb-2">
                Share your result
              </p>
              <p className="text-sm text-foreground font-medium leading-relaxed">
                &ldquo;I got <span className="text-accent">{result.title}</span>{" "}
                on the {quiz.title} quiz!&rdquo;
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <Share2 className="w-4 h-4" />
                  Share Result
                </button>
                {showShareMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 rounded-xl bg-surface border border-border space-y-2 z-10 w-56">
                    <button
                      onClick={() => {
                        window.open(
                          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            shareText
                          )}&url=${encodeURIComponent(shareUrl)}`,
                          "_blank"
                        );
                        setShowShareMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-light transition-colors"
                    >
                      <Twitter className="w-4 h-4" /> Share on Twitter
                    </button>
                    <button
                      onClick={() => {
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            shareUrl
                          )}`,
                          "_blank"
                        );
                        setShowShareMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-light transition-colors"
                    >
                      <Facebook className="w-4 h-4" /> Share on Facebook
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-light transition-colors"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-400" />{" "}
                          Link Copied!
                        </>
                      ) : (
                        <>
                          <Link2 className="w-4 h-4" /> Copy Share Link
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <Link
                href={`/quizzes/${quiz.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-border text-sm font-semibold hover:border-accent/50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Take Quiz Again
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Quizzes */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-lg font-semibold mb-4">Try Another Quiz</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {relatedQuizzes.map((q) => (
            <Link
              key={q.id}
              href={`/quizzes/${q.slug}`}
              className="group p-4 rounded-xl bg-surface border border-border hover:border-accent/50 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-3">
                <HelpCircle className="w-5 h-5 text-accent" />
              </div>
              <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-accent transition-colors">
                {q.title}
              </h4>
              <p className="text-xs text-muted mt-1">
                {q.questionCount} questions
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <Link
            href="/quizzes"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all quizzes
          </Link>
        </div>
      </div>
    </div>
  );
}
