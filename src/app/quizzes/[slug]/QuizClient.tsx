"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Users,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Share2,
  Twitter,
  Facebook,
  Link2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import type { Quiz, QuizResult } from "@/data/content";
import { getRelatedQuizzes } from "@/data/content";

interface Props {
  quiz: Quiz;
}

type QuizState = "intro" | "questions" | "results";

export default function QuizClient({ quiz }: Props) {
  const [state, setState] = useState<QuizState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const relatedQuizzes = useMemo(() => getRelatedQuizzes(quiz.slug), [quiz.slug]);

  const result = useMemo((): QuizResult | null => {
    if (state !== "results") return null;

    const valueCounts: Record<string, number> = {};
    Object.values(answers).forEach((value) => {
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    });

    let maxCount = 0;
    let maxValue = "";
    Object.entries(valueCounts).forEach(([value, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxValue = value;
      }
    });

    return quiz.results.find((r) => r.id === maxValue) || quiz.results[0];
  }, [state, answers, quiz.results]);

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleSelectOption = (optionId: string, value: string) => {
    setSelectedOption(optionId);

    setTimeout(() => {
      setAnswers((prev) => ({
        ...prev,
        [quiz.questions[currentQuestion].id]: value,
      }));

      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setState("results");
      }
    }, 400);
  };

  const handleRestart = () => {
    setState("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  // Intro screen
  if (state === "intro") {
    return (
      <div className="min-h-screen">
        <section className="bg-gradient-to-b from-accent/15 via-surface/50 to-background py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted mb-6">
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
              <span className="text-foreground truncate">{quiz.title}</span>
            </nav>

            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-10 h-10 text-accent" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium mb-4">
                {quiz.category}
              </span>

              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                {quiz.title}
              </h1>
              <p className="text-muted text-lg max-w-xl mx-auto mb-6">
                {quiz.description}
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-muted mb-8">
                <span>{quiz.questionCount} questions</span>
                <span>&middot;</span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {(quiz.takenCount / 1000).toFixed(1)}k people taken
                </span>
              </div>

              <button
                onClick={() => setState("questions")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-accent to-primary text-white text-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Start Quiz
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Questions screen
  if (state === "questions") {
    const question = quiz.questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-b from-accent/5 to-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted mb-2">
              <span>
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 max-w-xl mx-auto">
            {question.options.map((option) => {
              const isSelected = selectedOption === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id, option.value)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-accent/20 border-accent text-foreground"
                      : "bg-surface border-border hover:border-accent/50 text-muted hover:text-foreground"
                  } ${selectedOption !== null && !isSelected ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected
                          ? "border-accent bg-accent"
                          : "border-border"
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-xs font-bold text-muted">
                          {option.id.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{option.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion((prev) => prev - 1);
                  setSelectedOption(null);
                } else {
                  setState("intro");
                }
              }}
              className="flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentQuestion > 0 ? "Previous" : "Back"}
            </button>
            <span className="text-xs text-muted">{quiz.title}</span>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (state === "results" && result) {
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
              <span className="text-foreground truncate">{quiz.title}</span>
            </nav>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Your Result
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">
                {result.title}
              </h1>

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
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 rounded-xl bg-surface border border-border space-y-2 z-10 w-48">
                      <button
                        onClick={() => {
                          window.open(
                            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                              `I got "${result.title}" on the ${quiz.title} quiz! Try it yourself:`
                            )}&url=${encodeURIComponent(window.location.href)}`,
                            "_blank"
                          );
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-light transition-colors"
                      >
                        <Twitter className="w-4 h-4" /> Twitter
                      </button>
                      <button
                        onClick={() => {
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              window.location.href
                            )}`,
                            "_blank"
                          );
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-light transition-colors"
                      >
                        <Facebook className="w-4 h-4" /> Facebook
                      </button>
                      <button
                        onClick={() => {
                          handleCopyLink();
                          setShowShareMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-light transition-colors"
                      >
                        <Link2 className="w-4 h-4" /> Copy Link
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-border text-sm font-semibold hover:border-accent/50 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Quiz
                </button>
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

  return null;
}
