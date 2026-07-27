"use client"


import { useState, useMemo, useRef, useEffect } from "react";
import { Lock, Sparkles, Check, ChevronDown, Copy, Eye } from "lucide-react";

const COLOR_PRESETS = [
  { name: "Coral Pulse", value: "#FF5D3A" },
  { name: "Signal Blue", value: "#2F6FED" },
  { name: "Verified Green", value: "#1FA971" },
  { name: "Midnight", value: "#15130F" },
  { name: "Amber", value: "#E8A33D" },
  { name: "Orchid", value: "#9256D9" },
];

const FONT_OPTIONS = [
  { label: "Inter (default)", value: "inter" },
  { label: "System UI", value: "system" },
  { label: "Fraunces (serif)", value: "fraunces", premium: true },
  { label: "JetBrains Mono", value: "mono", premium: true },
];

const ANIMATION_OPTIONS = [
  { label: "Slide up", value: "slide-up" },
  { label: "Fade in", value: "fade-in" },
  { label: "Bounce in", value: "bounce-in", premium: true },
  { label: "Pulse scale", value: "pulse-scale", premium: true },
];

const AVATAR_STYLE_OPTIONS = [
  { label: "Initials", value: "initials" },
  { label: "Photo", value: "photo" },
  { label: "Icon", value: "icon" },
  { label: "None", value: "none" },
];

const POSITION_OPTIONS = [
  { label: "Bottom left", value: "bottom-left" },
  { label: "Bottom right", value: "bottom-right" },
  { label: "Top left", value: "top-left" },
  { label: "Top right", value: "top-right" },
];

const DEFAULT_CONFIG = {
  accentColor: "#FF5D3A",
  shape: "rounded",
  size: "md",
  position: "bottom-left",
  font: "inter",
  animation: "slide-up",
  avatarStyle: "initials",
  showTimestamp: true,
  showVerifiedBadge: false,
  showCloseButton: true,
  shadow: "soft",
  interval: 6,
  darkMode: false,
  removeBranding: false,
  customSound: false,
};

const SHAPE_RADIUS: Record<string, string> = { sharp: "rounded-sm", rounded: "rounded-2xl", pill: "rounded-full" };
const SIZE_SCALE: Record<string, string> = { sm: "scale-90", md: "scale-100", lg: "scale-110" };
const SHADOW_CLASS: Record<string, string> = { none: "shadow-none", soft: "shadow-lg", lifted: "shadow-2xl" };


const FONT_CLASS: Record<string, string> = {
  inter: "font-sans",
  system: "font-sans",
  fraunces: "font-serif",
  mono: "font-mono",
};

const ANIM_KEYFRAMES = `
@keyframes ep-slide-up { from { opacity:0; transform:translateY(14px);} to { opacity:1; transform:translateY(0);} }
@keyframes ep-fade-in { from { opacity:0;} to { opacity:1;} }
@keyframes ep-bounce-in { 0% { opacity:0; transform:translateY(18px) scale(0.9);} 60% { opacity:1; transform:translateY(-4px) scale(1.02);} 100% { opacity:1; transform:translateY(0) scale(1);} }
@keyframes ep-pulse-scale { 0% { opacity:0; transform:scale(0.85);} 70% { opacity:1; transform:scale(1.03);} 100% { opacity:1; transform:scale(1);} }
@keyframes ep-draw { to { stroke-dashoffset: 0; } }
.ep-anim-slide-up { animation: ep-slide-up 0.42s cubic-bezier(.2,.7,.3,1); }
.ep-anim-fade-in { animation: ep-fade-in 0.5s ease; }
.ep-anim-bounce-in { animation: ep-bounce-in 0.6s cubic-bezier(.34,1.56,.64,1); }
.ep-anim-pulse-scale { animation: ep-pulse-scale 0.55s cubic-bezier(.34,1.56,.64,1); }
.ep-beat { stroke-dasharray: 260; stroke-dashoffset: 260; animation: ep-draw 1.1s ease-out; }
@media (prefers-reduced-motion: reduce) {
  .ep-anim-slide-up, .ep-anim-fade-in, .ep-anim-bounce-in, .ep-anim-pulse-scale { animation: ep-fade-in 0.25s ease; }
  .ep-beat { animation: none; stroke-dashoffset: 0; }
}
`;

export default function WidgetEditor() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [isPro] = useState(false); // wire this to your Supabase subscription check
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [beat, setBeat] = useState(0);
  const ddRef = useRef<HTMLDivElement>(null);

  const set = (patch: Partial<typeof DEFAULT_CONFIG>) => setConfig((c) => ({ ...c, ...patch }));
  const replay = () => setPreviewKey((k) => k + 1);

  const guardedSet = (patch: Partial<typeof DEFAULT_CONFIG>, isPremium?: boolean) => {
    if (isPremium && !isPro) {
      setShowUpgrade(true);
      return;
    }
    set(patch);
  };

  useEffect(() => {
    const t = setInterval(() => setBeat((b) => b + 1), config.interval * 1000);
    return () => clearInterval(t);
  }, [config.interval]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setOpenDropdown(null);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const embedSnippet = useMemo(() => {
    return `<script src="https://cdn.proofpad.io/live-pulse.js"
  data-widget-id="YOUR_WIDGET_ID"
  data-accent="${config.accentColor}"
  data-shape="${config.shape}"
  data-size="${config.size}"
  data-position="${config.position}"
  data-interval="${config.interval}">
</script>`;
  }, [config]);

  const copySnippet = () => {
    navigator.clipboard?.writeText(embedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const isDark = config.darkMode;
  const cardBg = isDark ? "bg-neutral-900 border-neutral-700 text-neutral-50" : "bg-white border-stone-200 text-stone-900";
  const subtext = isDark ? "text-neutral-400" : "text-stone-500";

  const renderDropdown = (key: string, value: string, options: { label: string; value: string; premium?: boolean }[]) => {
    const current = options.find((o) => o.value === value) ?? options[0];
    const open = openDropdown === key;
    return (
      <div className="relative" ref={open ? ddRef : null}>
        <button
          type="button"
          onClick={() => setOpenDropdown(open ? null : key)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-stone-200 bg-white text-sm font-medium text-stone-900"
        >
          <span>{current.label}</span>
          <ChevronDown size={15} />
        </button>
        {open && (
          <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white border border-stone-200 rounded-lg shadow-xl z-20 overflow-hidden">
            {options.map((o) => {
              const locked = o.premium && !isPro;
              return (
                <button
                  key={o.value}
                  type="button"
                  disabled={locked}
                  onClick={() => {
                    if (locked) {
                      setShowUpgrade(true);
                      return;
                    }
                    if (key === "font") set({ font: o.value });
                    if (key === "animation") {
                      set({ animation: o.value });
                      replay();
                    }
                    if (key === "position") set({ position: o.value });
                    if (key === "avatarStyle") set({ avatarStyle: o.value });
                    setOpenDropdown(null);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm text-left ${locked ? "text-stone-300 cursor-not-allowed" : "text-stone-900 hover:bg-purple-50"
                    }`}
                >
                  <span>{o.label}</span>
                  {o.premium &&
                    (locked ? (
                      <Lock size={12} />
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded">
                        <Lock size={9} /> Pro
                      </span>
                    ))}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderToggle = (label: string, checked: boolean, onToggle: (val: boolean) => void, locked?: boolean) => (
    <button
      type="button"
      onClick={() => (locked ? setShowUpgrade(true) : onToggle(!checked))}
      className="w-full flex items-center justify-between py-2.5"
    >
      <span className="flex items-center gap-2 text-sm font-medium text-stone-900">
        {label}
        {locked && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-50 bg-purple-800 border border-purple-200 px-1.5 py-0.5 rounded">
            <Lock size={9} /> Pro
          </span>
        )}
      </span>
      <span
        className={`w-9 h-5 rounded-full relative transition-colors ${checked ? "bg-purple-800" : "bg-stone-200"
          } ${locked ? "opacity-50" : ""}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0"
            }`}
        />
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-purple-50 font-sans text-stone-900">
      <style>{ANIM_KEYFRAMES}</style>

      <header className="flex items-center justify-between px-8 py-5 border-b border-stone-200">
        <div>
          <span className="block font-mono text-[11px] decoration-underline tracking-wider uppercase text-purple-600 mb-0.5">
            ProofPad · Live Pulse
          </span>
          <h1 className=" text-2xl font-semibold text-stone-900">Widget editor</h1>
        </div>
        <div className="flex items-center gap-2.5">
          {!isPro && (
            <button
              onClick={() => setShowUpgrade(true)}
              className="flex items-center gap-1.5 px-3.5 py-3 rounded-lg  border-2 border-gray bg-purple-600 text-purple-50 text-xs font-bold hover: cursor-pointer"
            >
              <Sparkles size={13} />
              Upgrade to Pro
            </button>
          )}
          <button className="px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-semibold hover: cursor-pointer">
            Save widget
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(320px,400px)_1fr] items-start">
        <div className="px-8 pb-16 pt-2 border-b md:border-b-0 md:border-r border-stone-200 max-h-none md:max-h-[calc(100vh-77px)] overflow-y-auto">
          <section className="py-5 border-b border-stone-200">
            <span className="block font-mono text-[10.5px] tracking-wider uppercase text-purple-600 mb-1">01 — Color</span>
            <h3 className=" text-lg font-semibold mb-3.5">Accent color</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {COLOR_PRESETS.map((c) => (
                <button
                  key={c.value}
                  aria-label={c.name}
                  onClick={() => set({ accentColor: c.value })}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
                  style={{
                    background: c.value,
                    outline: config.accentColor === c.value ? `2px solid ${c.value}` : "none",
                    outlineOffset: "2px",
                  }}
                >
                  {config.accentColor === c.value && <Check size={13} color="#fff" strokeWidth={3} />}
                </button>
              ))}
              <label className="w-8 h-8 rounded-lg border-2 border-dashed border-stone-300 flex items-center justify-center cursor-pointer relative overflow-hidden bg-gradient-to-br from-purple-400 via-emerald-400 to-purple-400">
                <input
                  type="color"
                  value={config.accentColor}
                  onChange={(e) => set({ accentColor: e.target.value })}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  aria-label="Custom color"
                />
              </label>
            </div>
          </section>

          <section className="py-5 border-b border-stone-200">
            <span className="block font-mono text-[10.5px] tracking-wider uppercase text-purple-600 mb-1">02 — Shape</span>
            <h3 className=" text-lg font-semibold mb-3.5">Corner style</h3>
            <div className="flex gap-2">
              {["sharp", "rounded", "pill"].map((s) => (
                <button
                  key={s}
                  onClick={() => set({ shape: s })}
                  className={`flex-1 flex flex-col items-center gap-2 py-3 rounded-lg border-2 ${config.shape === s ? "border-purple-500 bg-orange-50" : "border-stone-200 bg-white"
                    }`}
                >
                  <div
                    className={`w-9 h-5 bg-stone-900 ${s === "sharp" ? "rounded-none" : s === "rounded" ? "rounded-lg" : "rounded-full"
                      }`}
                  />
                  <span className="text-xs font-semibold capitalize">{s}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="py-5 border-b border-stone-200">
            <span className="block font-mono text-[10.5px] tracking-wider uppercase text-purple-600 mb-1 ">03 — Size</span>
            <h3 className="text-lg font-semibold mb-3.5">Widget size</h3>
            <div className="flex gap-2">
              {["sm", "md", "lg"].map((s) => (
                <button
                  key={s}
                  onClick={() => set({ size: s })}
                  className={`flex-1 py-2.5 rounded-lg border-2 text-xs font-bold tracking-wide ${config.size === s ? "border-orange-500 bg-orange-50 text-purple-600" : "border-stone-200 text-stone-900"
                    }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </section>

          <section className="py-5 border-b border-stone-200">
            <span className="block font-mono text-[10.5px] tracking-wider uppercase text-purple-600 mb-1">04 — Placement</span>
            <h3 className=" text-lg font-semibold mb-3.5">Screen position</h3>
            {renderDropdown("position", config.position, POSITION_OPTIONS)}
          </section>

          <section className="py-5 border-b border-stone-200">
            <span className="block font-mono text-[10.5px] tracking-wider uppercase text-purple-600 mb-1">05 — Typography</span>
            <h3 className=" text-lg font-semibold mb-3.5">Font</h3>
            {renderDropdown("font", config.font, FONT_OPTIONS)}
          </section>

          <section className="py-5 border-b border-stone-200">
            <span className="block font-mono text-[10.5px] tracking-wider uppercase text-purple-600 mb-1">06 — Motion</span>
            <h3 className=" text-lg font-semibold mb-3.5">Entrance animation</h3>
            {renderDropdown("animation", config.animation, ANIMATION_OPTIONS)}
          </section>

          <section className="py-5 border-b border-stone-200">
            <span className="block font-mono text-[10.5px] tracking-wider uppercase text-purple-600 mb-1">07 — Avatar</span>
            <h3 className=" text-lg font-semibold mb-3.5">Avatar style</h3>
            {renderDropdown("avatarStyle", config.avatarStyle, AVATAR_STYLE_OPTIONS)}
          </section>

          <section className="py-5 border-b border-stone-200">
            <span className="block font-mono text-[10.5px] tracking-wider uppercase text-purple-600 mb-1">08 — Timing</span>
            <h3 className=" text-lg font-semibold mb-3.5">Interval between notifications</h3>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={2}
                max={20}
                step={1}
                value={config.interval}
                onChange={(e) => set({ interval: Number(e.target.value) })}
                className="flex-1 accent-purple-500"
              />
              <span className="font-mono text-xs font-medium min-w-[34px] text-right">{config.interval}s</span>
            </div>
          </section>

          <section className="py-5 border-b border-stone-200 flex flex-col">
            <span className="block font-mono text-[10.5px] tracking-wider uppercase text-purple-600 mb-1">09 — Content</span>
            <h3 className=" text-lg font-semibold mb-1">Display options</h3>
            {renderToggle("Show timestamp", config.showTimestamp, (v: boolean) => set({ showTimestamp: v }))}
            {renderToggle("Show close button", config.showCloseButton, (v: boolean) => set({ showCloseButton: v }))}
            {renderToggle("Verified badge", config.showVerifiedBadge, (v: boolean) => guardedSet({ showVerifiedBadge: v }, true), !isPro)}
          </section>

          <section className="py-5 -mx-8 px-8 flex flex-col bg-gradient-to-b from-purple-100 to-purple-50">
            <span className="block font-mono text-[10.5px] tracking-wider uppercase text-purple-600 mb-1">10 — Pro features</span>
            <h3 className=" text-lg font-semibold mb-1">Premium customization</h3>
            {renderToggle("Elevated shadow", config.shadow === "lifted", (v: boolean) => guardedSet({ shadow: v ? "lifted" : "soft" }, true), !isPro)}
            {renderToggle("Dark mode widget", config.darkMode, (v: boolean) => guardedSet({ darkMode: v }, true), !isPro)}
            {renderToggle("Custom notification sound", config.customSound, (v: boolean) => guardedSet({ customSound: v }, true), !isPro)}
            {renderToggle('Remove "via ProofPad" branding', config.removeBranding, (v: boolean) => guardedSet({ removeBranding: v }, true), !isPro)}
          </section>
        </div>

        <div className="sticky top-0 p-8 flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-xl">
            <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-stone-100 border-b border-stone-200">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="ml-2.5 font-mono text-[11px] text-stone-400">yoursite.com</span>
            </div>

            <div className="px-3.5 pt-1.5 bg-white">
              <svg viewBox="0 0 400 28" className="w-full h-7 block" preserveAspectRatio="none">
                <line x1="0" y1="14" x2="400" y2="14" stroke="#E4DFD1" strokeWidth="1" />
                <path
                  key={beat}
                  d="M0,14 L160,14 L172,4 L184,24 L196,14 L400,14"
                  fill="none"
                  stroke={config.accentColor}
                  strokeWidth="2"
                  className="ep-beat"
                />
              </svg>
            </div>

            <div
              className={`h-[420px] flex p-6 ${isDark ? "bg-neutral-950" : "bg-stone-100"}`}
              style={{
                justifyContent: config.position.includes("right") ? "flex-end" : "flex-start",
                alignItems: config.position.includes("top") ? "flex-start" : "flex-end",
              }}
            >
              <div
                key={previewKey}
                className={`relative flex items-start gap-2.5 p-3.5 w-[300px] max-w-[90%] border ${SHAPE_RADIUS[config.shape]} ${SIZE_SCALE[config.size]} ${SHADOW_CLASS[config.shadow]} ${FONT_CLASS[config.font]} ${cardBg} ep-anim-${config.animation}`}
                style={{
                  transformOrigin: config.position.includes("left") ? "bottom left" : "bottom right",
                }}
              >
                {config.avatarStyle !== "none" && (
                  <div
                    className={`shrink-0 w-9 h-9 flex items-center justify-center overflow-hidden ${config.shape === "sharp" ? "rounded-sm" : "rounded-full"
                      }`}
                    style={{
                      background:
                        config.avatarStyle === "initials"
                          ? config.accentColor
                          : isDark
                            ? "#2A2720"
                            : "#F1EEE4",
                    }}
                  >
                    {config.avatarStyle === "initials" && (
                      <span className="text-white font-bold text-[13px]">SA</span>
                    )}
                    {config.avatarStyle === "icon" && <Sparkles size={15} color={config.accentColor} />}
                    {config.avatarStyle === "photo" && (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-stone-300 to-stone-500" />
                    )}
                  </div>
                )}

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="text-[13.5px] leading-snug">
                    <span className="font-semibold">Sarah from Austin</span>{" "}
                    <span className={subtext}>just subscribed</span>
                    {config.showVerifiedBadge && (
                      <Check
                        size={13}
                        color="#fff"
                        className="inline-block ml-1 rounded-full p-0.5 align-middle"
                        style={{ background: config.accentColor }}
                      />
                    )}
                  </div>
                  {config.showTimestamp && (
                    <div className={`text-[11.5px] mt-0.5 ${subtext}`}>2 minutes ago</div>
                  )}
                </div>

                {config.showCloseButton && (
                  <button
                    aria-label="Dismiss notification"
                    className={`absolute top-2 right-2.5 text-base leading-none opacity-50 ${subtext}`}
                  >
                    ×
                  </button>
                )}

                {!config.removeBranding && (
                  <div className={`absolute bottom-1 right-3 text-[9px] tracking-wide opacity-55 ${subtext}`}>
                    via ProofPad
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={replay}
            className="self-start flex items-center gap-1.5 px-3.5 py-2 rounded-lg border-2 border-stone-200 bg-white text-xs font-semibold"
          >
            <Eye size={13} />
            Replay preview
          </button>

          <div className="rounded-xl overflow-hidden border border-stone-200 bg-neutral-900">
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-neutral-800 text-[11.5px] font-semibold text-stone-400">
              <span>Embed code</span>
              <button onClick={copySnippet} className="flex items-center gap-1.5 text-stone-300">
                <Copy size={12} />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="m-0 p-3.5 font-mono text-[11.5px] leading-relaxed text-stone-200 whitespace-pre-wrap break-all">
              {embedSnippet}
            </pre>
          </div>
        </div>
      </div>

      {showUpgrade && (
        <div
          className="fixed inset-0 bg-black/45 flex items-center justify-center z-[100] p-5"
          onClick={() => setShowUpgrade(false)}
        >
          <div
            className="bg-purple-50 rounded-2xl p-7 max-w-[340px] w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-3.5">
              <Sparkles size={20} color="#7A5A1E" />
            </div>
            <h3 className="font-serif text-lg font-semibold mb-2">That one's a Pro feature</h3>
            <p className="text-[13.5px] leading-relaxed text-stone-500 mb-5">
              Unlock every color, shape, animation and branding option with ProofPad Pro — starting at $19/mo.
            </p>
            <button
              onClick={() => setShowUpgrade(false)}
              className="w-full py-3 rounded-lg bg-stone-900 text-white font-semibold text-[13.5px] mb-2"
            >
              See Pro plans
            </button>
            <button onClick={() => setShowUpgrade(false)} className="w-full py-2 text-stone-500 text-xs">
              Not now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}