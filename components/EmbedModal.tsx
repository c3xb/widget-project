'use client';

import React, { useState } from 'react';
import { Check, Copy, X, Code2, Sparkles } from 'lucide-react';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  widgetId: string;
}

export default function EmbedModal({ isOpen, onClose, widgetId }: EmbedModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Construct the script tag snippet dynamically
  const embedCode = `<script \n  src="http://192.168.0.135:3000/embed.js"\n  data-widget-id="${widgetId}"\n  async\n></script>`;

 const handleCopy = async () => {
  try {
    // 1. Try modern Clipboard API (Works on HTTPS or localhost)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(embedCode);
    } else {
      // 2. Fallback for HTTP / IP addresses (e.g. http://192.168.0.135:3000)
      const textArea = document.createElement('textarea');
      textArea.value = embedCode;
      
      // Keep textarea hidden off-screen
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      
      textArea.focus();
      textArea.select();
      
      document.execCommand('copy');
      textArea.remove();
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl text-zinc-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colorshover: cursor-pointer "
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Your Widget is Live!</h2>
            <p className="text-xs text-zinc-400">Copy and paste this snippet into your website's HTML.</p>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="relative my-4 overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs text-zinc-300">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/60 text-zinc-500 text-[11px]">
            <span className="flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5" /> HTML Snippet
            </span>
            <span>UTF-8</span>
          </div>
          <pre className="overflow-x-auto text-purple-300 selection:bg-purple-500/30">
            <code>{embedCode}</code>
          </pre>
        </div>

        {/* Actions / Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleCopy}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-medium transition-all hover: cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" /> Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copy Embed Code
              </>
            )}
          </button>
          
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-800 bg-zinc-800/50 px-4 py-2.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors hover: cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}