"use client";

import React, { useState } from 'react';

interface WidgetConfig {
  title: string;
  message: string;
  bgColor: string;
  textColor: string;
  position: 'bottom-right' | 'bottom-left';
  avatarChar: string;
}

 interface InteractiveDemoProps {
  onPublish?: () => void; // Question mark makes it optional
}

export default function OptimizedWidgetEditor({ onPublish }: InteractiveDemoProps) {
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>({
    title: 'Instant Social Proof',
    message: 'Someone just signed up from London!',
    bgColor: '#2563eb',
    textColor: '#ffffff',
    position: 'bottom-left',
    avatarChar: 'P',
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const handleChange = <K extends keyof WidgetConfig>(key: K, value: WidgetConfig[K]) => {
    setWidgetConfig((prev) => ({ ...prev, [key]: value }));
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 500);
  };

  const [displayDelay, setDisplayDelay] = useState<number>(3);
  const [autoClose, setAutoClose] = useState<number>(5);
  const [showCloseButton, setShowCloseButton] = useState<boolean>(true)
 
 

  return (
    <div id="editor" className="min-h-screen bg-[#fafafa] text-slate-900 p-6 lg:p-10 font-sans bg-purple-50">
      {/* HEADER SECTION */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Widget Builder
            </h1>
            <span className="text-[11px] font-semibold bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-200">
              Anis-widget
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Customize layout, copy, and real-time presentation.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            {isSyncing ? 'Saving...' : 'Changes saved'}
          </div>
          <button onClick={onPublish} className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-lg transition-all shadow-sm hover:shadow active:scale-[0.98] cursor-pointer">
            Publish Changes
          </button>
        </div>
      </header>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: EDITOR CONTROLS (5 Cols) */}
        <aside className="lg:col-span-5 space-y-6">
          
          {/* Section 1: Content & Colors */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="w-1 h-3.5 bg-purple-600 rounded-full" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Appearance & Content
              </h2>
            </div>

            <div className="space-y-4">
              {/* Heading Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">
                  Widget Heading
                </label>
                <input
                  type="text"
                  value={widgetConfig.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. Instant Social Proof"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all"
                />
              </div>

              {/* Message Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">
                  Message / Body
                </label>
                <input
                  type="text"
                  value={widgetConfig.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="e.g. Someone just signed up from London!"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all"
                />
              </div>
            </div>

            {/* Color Pickers */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Background</span>
                  <span className="text-xs font-mono font-bold text-slate-700 uppercase">{widgetConfig.bgColor}</span>
                </div>
                <input
                  type="color"
                  value={widgetConfig.bgColor}
                  onChange={(e) => handleChange('bgColor', e.target.value)}
                  className="w-7 h-7 rounded border border-slate-300 cursor-pointer bg-white"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Text Color</span>
                  <span className="text-xs font-mono font-bold text-slate-700 uppercase">{widgetConfig.textColor}</span>
                </div>
                <input
                  type="color"
                  value={widgetConfig.textColor}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                  className="w-7 h-7 rounded border border-slate-300 cursor-pointer bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Placement */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="w-1 h-3.5 bg-purple-600 rounded-full" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Placement
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100/80 rounded-lg border border-slate-200">
              {(['bottom-left', 'bottom-right'] as const).map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => handleChange('position', pos)}
                  className={`py-2 text-xs font-semibold rounded-md transition-all capitalize ${
                    widgetConfig.position === pos 
                      ? 'bg-white text-purple-700 shadow-xs border border-slate-200/60' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {pos.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
{/* Section 3: Behavior & Timing */}
<div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
    <span className="w-1 h-3.5 bg-purple-600 rounded-full" />
    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
      Behavior & Timing
    </h2>
  </div>

  <div className="grid grid-cols-2 gap-3">
    <div className="space-y-1">
      <label className="text-[11px] font-semibold text-slate-600">Display Delay (s)</label>
      <input
        type="number"
        min="0"
        max="30"
        value={displayDelay}
        onChange={(e) => setDisplayDelay(Number(e.target.value))}
        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-purple-600"
      />
    </div>

    <div className="space-y-1">
      <label className="text-[11px] font-semibold text-slate-600">Auto Close (s)</label>
      <input
        type="number"
        min="0"
        max="60"
        value={autoClose}
        onChange={(e) => setAutoClose(Number(e.target.value))}
        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-purple-600"
      />
    </div>
  </div>

  <div className="flex items-center justify-between pt-2">
    <span className="text-xs font-medium text-slate-700">Show Dismiss Button</span>
    <input
      type="checkbox"
      checked={showCloseButton}
      onChange={(e) => setShowCloseButton(e.target.checked)}
      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
    />
  </div>
</div>
        </aside>

        {/* RIGHT COLUMN: LIVE CANVAS PREVIEW (7 Cols) */}
        <main className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs p-6 min-h-[520px] flex flex-col">
          <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 relative flex flex-col justify-between overflow-hidden shadow-inner">
            
            {/* Simulated Browser Header Bar */}
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              </div>
              <div className="px-3 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                your-product.com
              </div>
              <div className="w-8" />
            </div>

            {/* Canvas Placeholder Icon */}
            <div className="my-auto text-center space-y-2 p-6">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mx-auto text-base font-bold">
                P
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Live Interactive Canvas
              </p>
            </div>

            {/* LIVE FLOATING WIDGET CARD */}
            <div
              className={`absolute bottom-5 transition-all duration-300 ease-in-out p-3.5 rounded-xl shadow-xl border border-white/10 flex items-center gap-3.5 max-w-[300px] ${
                widgetConfig.position === 'bottom-right' ? 'right-5' : 'left-5'
              }`}
              style={{ backgroundColor: widgetConfig.bgColor, color: widgetConfig.textColor }}
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-xs font-bold shrink-0 border border-white/20">
                {widgetConfig.avatarChar}
              </div>

              <div className="overflow-hidden space-y-0.5">
                <h4 className="text-xs font-bold leading-tight truncate">
                  {widgetConfig.title || 'Notification Title'}
                </h4>
                <p className="text-[11px] opacity-80 leading-tight truncate">
                  {widgetConfig.message || 'Notification body text...'}
                </p>
              </div>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}