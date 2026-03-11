"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Crown,
  Headphones,
  Heart,
  Sparkles,
  Leaf,
  Flame,
  ListMusic,
  RotateCcw,
} from "lucide-react";
import type { Story } from "@/data/stories";
import type { Episode } from "@/data/episodes";

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  sparkles: Sparkles,
  leaf: Leaf,
  flame: Flame,
};

interface Props {
  story: Story;
  episodes: Episode[];
}

export default function StoryPlayerClient({ story, episodes }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [completedEpisodes, setCompletedEpisodes] = useState<Set<number>>(
    new Set()
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentEpisode = episodes[currentIndex];
  const Icon = iconMap[story.icon] || Headphones;

  // Parse episode duration in minutes
  const parseDuration = useCallback((dur: string): number => {
    const match = dur.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 40;
  }, []);

  const durationMinutes = parseDuration(currentEpisode.duration);

  // Format time from minutes decimal
  const formatTime = useCallback((totalMinutes: number): string => {
    const mins = Math.floor(totalMinutes);
    const secs = Math.floor((totalMinutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Advance to next episode
  const goToNext = useCallback(() => {
    setCompletedEpisodes((prev) => new Set(prev).add(currentIndex));
    if (currentIndex < episodes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
      setCurrentTime("0:00");
      setIsPlaying(true);
    } else {
      // Story complete
      setIsPlaying(false);
      setProgress(100);
    }
  }, [currentIndex, episodes.length]);

  // Simulated playback
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            goToNext();
            return 0;
          }
          const newProgress = prev + 0.05;
          const elapsed = (newProgress / 100) * durationMinutes;
          setCurrentTime(formatTime(elapsed));
          return newProgress;
        });
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, durationMinutes, formatTime, goToNext]);

  const goToPrev = () => {
    if (progress > 5) {
      // Restart current episode if past first 5%
      setProgress(0);
      setCurrentTime("0:00");
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
      setCurrentTime("0:00");
    }
  };

  const selectEpisode = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    setCurrentTime("0:00");
    setIsPlaying(true);
  };

  const seekTo = (value: number) => {
    setProgress(value);
    const elapsed = (value / 100) * durationMinutes;
    setCurrentTime(formatTime(elapsed));
  };

  // Calculate overall story progress
  const overallProgress =
    ((completedEpisodes.size + progress / 100) / episodes.length) * 100;

  const allCompleted =
    completedEpisodes.size === episodes.length ||
    (completedEpisodes.size === episodes.length - 1 &&
      currentIndex === episodes.length - 1 &&
      progress >= 100);

  return (
    <div className="min-h-screen pb-44">
      {/* Story header */}
      <section
        className={`bg-gradient-to-b from-primary/15 via-surface/50 to-background py-10`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/story-mode"
              className="hover:text-foreground transition-colors"
            >
              Story Mode
            </Link>
            <span>/</span>
            <span className="text-foreground">{story.title}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${story.gradient} flex items-center justify-center flex-shrink-0`}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                {story.title}
              </h1>
              <p className="text-muted text-sm leading-relaxed mb-3">
                {story.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <ListMusic className="w-4 h-4" />
                  {episodes.length} episodes
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {story.totalDuration}
                </span>
              </div>
            </div>
          </div>

          {/* Overall progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-muted mb-1.5">
              <span>Story Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  allCompleted
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                    : "bg-gradient-to-r from-primary to-accent"
                }`}
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            {allCompleted && (
              <p className="text-sm text-emerald-400 mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Story complete! You made it through the entire journey.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main content area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Episode detail — 3 cols */}
          <div className="lg:col-span-3 space-y-6">
            {/* Currently playing */}
            <div className="rounded-2xl bg-surface border border-border p-6">
              <div className="flex items-center gap-2 text-xs text-muted mb-4">
                <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary-light font-medium">
                  Episode {currentIndex + 1} of {episodes.length}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-light">
                  {currentEpisode.category}
                </span>
                {currentEpisode.isPremium && (
                  <span className="px-2 py-0.5 rounded-full bg-accent/15 text-accent flex items-center gap-0.5">
                    <Crown className="w-3 h-3" />
                    Premium
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold mb-2">
                {currentEpisode.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-4">
                {currentEpisode.description}
              </p>

              {/* Key highlights */}
              <div className="space-y-2 mb-4">
                <h3 className="text-sm font-semibold">Key Highlights</h3>
                <ul className="space-y-1.5">
                  {currentEpisode.highlights.map((hl, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <span className="w-5 h-5 rounded-full bg-primary/15 text-primary-light text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Transcript toggle */}
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                Transcript
                {showTranscript ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {showTranscript && (
                <div className="mt-3 p-4 rounded-xl bg-background border border-border">
                  <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
                    {currentEpisode.transcript}
                  </p>
                </div>
              )}
            </div>

            {/* Next up preview (if not last) */}
            {currentIndex < episodes.length - 1 && (
              <div className="rounded-xl bg-surface/50 border border-border p-4">
                <p className="text-xs text-muted mb-2 uppercase tracking-wider font-medium">
                  Up Next
                </p>
                <button
                  onClick={() => selectEpisode(currentIndex + 1)}
                  className="w-full flex items-center gap-3 text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Play className="w-4 h-4 text-primary-light" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate group-hover:text-primary-light transition-colors">
                      {episodes[currentIndex + 1].title}
                    </p>
                    <p className="text-xs text-muted">
                      {episodes[currentIndex + 1].duration}
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Playlist sidebar — 2 cols */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-surface border border-border overflow-hidden sticky top-20">
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="w-full flex items-center justify-between p-4 text-sm font-semibold hover:bg-surface-light transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ListMusic className="w-4 h-4 text-primary-light" />
                  Playlist
                </span>
                {showPlaylist ? (
                  <ChevronUp className="w-4 h-4 text-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted" />
                )}
              </button>
              {showPlaylist && (
                <div className="border-t border-border">
                  {episodes.map((ep, i) => {
                    const isCurrent = i === currentIndex;
                    const isCompleted = completedEpisodes.has(i);

                    return (
                      <button
                        key={ep.id}
                        onClick={() => selectEpisode(i)}
                        className={`w-full flex items-center gap-3 p-4 text-left transition-all border-b border-border last:border-b-0 ${
                          isCurrent
                            ? "bg-primary/10"
                            : "hover:bg-surface-light"
                        }`}
                      >
                        {/* Number / status indicator */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                            isCurrent
                              ? "bg-gradient-to-r from-primary to-accent text-white"
                              : isCompleted
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-surface-light text-muted"
                          }`}
                        >
                          {isCompleted && !isCurrent ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : isCurrent && isPlaying ? (
                            <Pause className="w-3.5 h-3.5" />
                          ) : (
                            i + 1
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-sm font-medium truncate ${
                              isCurrent
                                ? "text-primary-light"
                                : isCompleted
                                ? "text-muted"
                                : "text-foreground"
                            }`}
                          >
                            {ep.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-muted">
                              {ep.duration}
                            </span>
                            {ep.isPremium && (
                              <Crown className="w-3 h-3 text-accent" />
                            )}
                          </div>
                        </div>

                        {/* Current episode mini progress */}
                        {isCurrent && (
                          <div className="w-8 h-8 relative flex-shrink-0">
                            <svg
                              className="w-8 h-8 -rotate-90"
                              viewBox="0 0 32 32"
                            >
                              <circle
                                cx="16"
                                cy="16"
                                r="13"
                                fill="none"
                                stroke="currentColor"
                                className="text-border"
                                strokeWidth="3"
                              />
                              <circle
                                cx="16"
                                cy="16"
                                r="13"
                                fill="none"
                                stroke="url(#progress-gradient)"
                                strokeWidth="3"
                                strokeDasharray={`${
                                  (progress / 100) * 81.68
                                } 81.68`}
                                strokeLinecap="round"
                              />
                              <defs>
                                <linearGradient
                                  id="progress-gradient"
                                  x1="0"
                                  y1="0"
                                  x2="1"
                                  y2="1"
                                >
                                  <stop offset="0%" stopColor="#7c3aed" />
                                  <stop offset="100%" stopColor="#f472b6" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Audio Player */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl border-t border-border">
        {/* Seekable progress bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative h-1.5 -mt-0.5 group cursor-pointer">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Seek"
            />
            <div className="absolute inset-0 bg-border rounded-full" />
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${progress}%`, marginLeft: "-6px" }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 py-3">
            {/* Story badge + track info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${story.gradient} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {currentEpisode.title}
                </p>
                <p className="text-xs text-muted">
                  {story.title} &middot; Ep {currentIndex + 1} of{" "}
                  {episodes.length}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              <button
                aria-label="Previous"
                onClick={goToPrev}
                className="p-2 text-muted hover:text-foreground transition-colors hidden sm:block"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                aria-label={isPlaying ? "Pause" : "Play"}
                className="p-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" fill="white" />
                )}
              </button>
              <button
                aria-label="Next"
                onClick={() => {
                  if (currentIndex < episodes.length - 1) {
                    selectEpisode(currentIndex + 1);
                  }
                }}
                disabled={currentIndex === episodes.length - 1}
                className="p-2 text-muted hover:text-foreground transition-colors hidden sm:block disabled:opacity-30"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Time */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted tabular-nums">
              <span>{currentTime}</span>
              <span>/</span>
              <span>{currentEpisode.duration}</span>
            </div>

            {/* Volume */}
            <div className="hidden md:flex items-center gap-2">
              <button
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="p-1.5 text-muted hover:text-foreground transition-colors"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setIsMuted(false);
                }}
                className="w-20"
                aria-label="Volume"
              />
            </div>

            {/* Restart story */}
            {allCompleted && (
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setProgress(0);
                  setCurrentTime("0:00");
                  setCompletedEpisodes(new Set());
                  setIsPlaying(true);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 text-primary-light text-xs font-medium hover:bg-primary/25 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Replay
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
