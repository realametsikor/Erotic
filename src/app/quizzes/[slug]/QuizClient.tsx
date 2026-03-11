"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HelpCircle,
  Users,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import type { Quiz } from "@/data/content";

interface Props {
  quiz: Quiz;
}

type QuizState = "intro" | "questions";

export default function QuizClient({ quiz }: Props) {
  const router = useRouter();
  const [state, setState] = useState<QuizState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const computeResult = (allAnswers: Record<string, string>): string => {
    const valueCounts: Record<string, number> = {};
    Object.values(allAnswers).forEach((value) => {
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

    const result = quiz.results.find((r) => r.id === maxValue) || quiz.results[0];
    return result.id;
  };

  const handleSelectOption = (optionId: string, value: string) => {
    setSelectedOption(optionId);

    setTimeout(() => {
      const newAnswers = {
        ...answers,
        [quiz.questions[currentQuestion].id]: value,
      };
      setAnswers(newAnswers);

      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        const resultId = computeResult(newAnswers);
        router.push(`/quizzes/${quiz.slug}/results?r=${resultId}`);
      }
    }, 400);
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

  return null;
}
