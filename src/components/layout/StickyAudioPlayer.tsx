"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  Crown,
} from "lucide-react";

interface AudioPlayerProps {
  title?: string;
  artist?: string;
  audioUrl?: string;
  thumbnail?: string;
  isPremium?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
}

export default function StickyAudioPlayer({
  title,
  artist = "Heartcast",
  isPremium = false,
  isVisible = false,
  onClose,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const progressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Simulate progress for demo
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const newProgress = prev + 0.1;
          const mins = Math.floor((newProgress / 100) * 42);
          const secs = Math.floor(((newProgress / 100) * 42 * 60) % 60);
          setCurrentTime(`${mins}:${secs.toString().padStart(2, "0")}`);
          return newProgress;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    setDuration("42:00");
  }, []);

  if (!isVisible || !title) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Progress bar */}
        <div className="relative h-1 -mt-0.5">
          <div className="absolute inset-0 bg-border rounded-full" />
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-4 py-3">
          {/* Track info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0">
              {isPremium ? (
                <Crown className="w-5 h-5 text-accent" />
              ) : (
                <Play className="w-5 h-5 text-primary-light" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {title}
              </p>
              <p className="text-xs text-muted">{artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous"
              className="p-1.5 text-muted hover:text-foreground transition-colors hidden sm:block"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              aria-label={isPlaying ? "Pause" : "Play"}
              className="p-2 rounded-full bg-primary text-white hover:bg-primary-light transition-colors"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
            <button
              aria-label="Next"
              className="p-1.5 text-muted hover:text-foreground transition-colors hidden sm:block"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Time */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted">
            <span>{currentTime}</span>
            <span>/</span>
            <span>{duration}</span>
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
              ref={progressRef}
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                setIsMuted(false);
              }}
              className="w-20"
            />
          </div>

          {/* Close */}
          <button
            aria-label="Close player"
            className="p-1.5 text-muted hover:text-foreground transition-colors"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
