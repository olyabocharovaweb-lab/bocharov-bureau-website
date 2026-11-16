/**
 * Soft "tick" for hover, synthesized with the Web Audio API (no audio files).
 * Browsers only allow sound after the visitor has interacted with the page
 * (click, tap or key), so the first hovers before that are silent.
 */
let ctx: AudioContext | null = null;
let unlocked = false;

function unlock() {
  if (unlocked) return;
  unlocked = true;
  ctx ??= new AudioContext();
  void ctx.resume();
}

if (typeof window !== "undefined") {
  for (const ev of ["pointerdown", "keydown"] as const) {
    window.addEventListener(ev, unlock, { once: true, passive: true });
  }
}

export function playHoverTick() {
  if (!unlocked || !ctx || ctx.state !== "running") return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(1800, t);
  osc.frequency.exponentialRampToValueAtTime(900, t + 0.05);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.05, t + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.08);
}
