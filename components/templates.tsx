"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// --- TYPES ---
export type Category = "All" | "Social Proof" | "Urgency" | "Reviews" | "Announcements" | "Leads";

export interface WidgetTemplate {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  badge: string;
  isFeatured?: boolean;
  iconType: "shopping-bag" | "zap" | "star" | "pulse" | "megaphone" | "box" | "user-plus" | "shield" | "clock" | "trending-up" | "mail" | "gift";
  preview: {
    title: string;
    subtitle: string;
    time?: string;
    rating?: number;
    ctaText?: string;
    isLive?: boolean;
  };
}

// --- 12 STANDOUT FEATURED TEMPLATES ---
const FEATURED_TEMPLATES: WidgetTemplate[] = [
  {
    id: "feat-recent-purchase",
    title: "Recent Purchase Activity",
    category: "Social Proof",
    description: "Display verified customer purchases in real-time to build immediate buying confidence.",
    badge: "Top Converter",
    isFeatured: true,
    iconType: "shopping-bag",
    preview: { title: "Sarah M. (New York)", subtitle: "Purchased Pro Lifetime Membership", time: "2 minutes ago" }
  },
  {
    id: "feat-countdown-banner",
    title: "Synchronized Offer Expiration",
    category: "Urgency",
    description: "Drive immediate action with a synchronized offer expiration banner.",
    badge: "High Urgency",
    isFeatured: true,
    iconType: "zap",
    preview: { title: "Special Launch Promotion", subtitle: "Save 30% on annual billing today", time: "04m 32s remaining", ctaText: "Claim Discount" }
  },
  {
    id: "feat-verified-review",
    title: "Executive Endorsement Card",
    category: "Reviews",
    description: "Highlight authentic client feedback and star ratings from verified accounts.",
    badge: "Social Trust",
    isFeatured: true,
    iconType: "star",
    preview: { title: "Alex Miller — Founder", subtitle: '"ProofPad increased our checkout conversion rate by 24% in 10 days."', rating: 5 }
  },
  {
    id: "feat-live-traffic",
    title: "Active Viewers Counter",
    category: "Social Proof",
    description: "Show real-time active site visitors to signal high product demand.",
    badge: "Real-Time",
    isFeatured: true,
    iconType: "pulse",
    preview: { title: "48 Active Viewers", subtitle: "Currently exploring product pricing", time: "Live updates", isLive: true }
  },
  {
    id: "feat-product-release",
    title: "Changelog Release Alert",
    category: "Announcements",
    description: "Broadcast major platform updates, feature releases, or patch notes.",
    badge: "Updates",
    iconType: "megaphone",
    preview: { title: "Version 2.0 Released", subtitle: "Explore updated analytics and real-time event tracking.", ctaText: "View Changelog" }
  },
  {
    id: "feat-inventory-scarcity",
    title: "Stock Capacity Indicator",
    category: "Urgency",
    description: "Inform prospective buyers when remaining inventory or cohort seats are low.",
    badge: "Scarcity",
    isFeatured: true,
    iconType: "box",
    preview: { title: "Limited Seats Remaining", subtitle: "Only 3 spots left for this live session." }
  },
  {
    id: "feat-user-signup",
    title: "Live Account Registrations",
    category: "Social Proof",
    description: "Trigger notifications whenever a new user signs up for your platform.",
    badge: "Growth",
    isFeatured: true,
    iconType: "user-plus",
    preview: { title: "David K. joined ProofPad", subtitle: "Started a 14-day free trial", time: "5 minutes ago" }
  },
  {
    id: "feat-guarantee-badge",
    title: "Risk-Free Guarantee Banner",
    category: "Social Proof",
    description: "Remove buyer hesitation with prominent refund and satisfaction guarantees.",
    badge: "Trust Anchor",
    isFeatured: true,
    iconType: "shield",
    preview: { title: "30-Day Guarantee", subtitle: "Full refund if not completely satisfied." }
  },
  {
    id: "feat-flash-sale",
    title: "Flash Sale Timer Bar",
    category: "Urgency",
    description: "Trigger impulse conversion with an urgent countdown timer notification.",
    badge: "Sales Boost",
    iconType: "clock",
    preview: { title: "Midnight Sale Ending", subtitle: "Use code FLASH50 at checkout", time: "01h 12m remaining" }
  },
  {
    id: "feat-milestone-stats",
    title: "Global Traction Milestone",
    category: "Social Proof",
    description: "Display total registered users, volume processed, or downloads.",
    badge: "Authority",
    isFeatured: true,
    iconType: "trending-up",
    preview: { title: "10,000+ Active Teams", subtitle: "Trusted across 40+ countries worldwide" }
  },
  {
    id: "feat-lead-capture",
    title: "Growth Digest Opt-In",
    category: "Leads",
    description: "Capture email subscribers with a clean non-intrusive bottom bar.",
    badge: "Lead Gen",
    isFeatured: true,
    iconType: "mail",
    preview: { title: "Weekly Insights", subtitle: "Join 5,000+ founders receiving our newsletter.", ctaText: "Subscribe" }
  },
  {
    id: "feat-welcome-discount",
    title: "First-Touch Promo Perk",
    category: "Leads",
    description: "Offer custom coupon codes to first-time website visitors.",
    badge: "Welcome Perk",
    isFeatured: true,
    iconType: "gift",
    preview: { title: "Welcome Discount", subtitle: "Get 15% off your first checkout today.", ctaText: "Claim Perk" }
  }
];

// --- 100+ CATALOG GENERATOR FUNCTION ---
function generateCatalogTemplates(): WidgetTemplate[] {
  const categories: Exclude<Category, "All">[] = ["Social Proof", "Urgency", "Reviews", "Announcements", "Leads"];
  const iconTypes: WidgetTemplate["iconType"][] = ["shopping-bag", "zap", "star", "pulse", "megaphone", "box", "user-plus", "shield", "clock", "trending-up", "mail", "gift"];
  
  const catalog: WidgetTemplate[] = [];

  const templatesPerCat = 22; // 5 x 22 = 110 additional templates

  categories.forEach((cat) => {
    for (let i = 1; i <= templatesPerCat; i++) {
      const icon = iconTypes[(i + cat.length) % iconTypes.length];
      catalog.push({
        id: `cat-${cat.toLowerCase().replace(/\s+/g, "-")}-${i}`,
        title: `${cat} Module ${i < 10 ? "0" + i : i}`,
        category: cat,
        description: `Optimized layout designed specifically for high-impact ${cat.toLowerCase()} engagement.`,
        badge: `Variant ${i}`,
        iconType: icon,
        preview: {
          title: `${cat} Alert #${i}`,
          subtitle: `Automated dynamic trigger for modern website visitors.`,
          time: i % 2 === 0 ? "Just now" : "10m ago",
          rating: cat === "Reviews" ? 5 : undefined,
          isLive: i % 3 === 0
        }
      });
    }
  });

  return catalog;
}

const ALL_CATALOG_TEMPLATES = generateCatalogTemplates();
const CATEGORIES: Category[] = ["All", "Social Proof", "Urgency", "Reviews", "Announcements", "Leads"];

export default function WidgetTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"featured" | "catalog">("featured");

  // Filter Catalog
  const filteredCatalog = useMemo(() => {
    return ALL_CATALOG_TEMPLATES.filter((t) => {
      const matchesCat = selectedCategory === "All" || t.category === selectedCategory;
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-purple-50 text-gray-900 font-sans antialiased py-12 px-4 sm:px-6 lg:px-8 mb-50">
      <main className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-purple-700 border border-purple-200 inline-block shadow-xs">
            100+ Professional Layouts
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Widget Template Library
          </h1>
          <p className="text-sm sm:text-base text-gray-500 font-normal leading-relaxed">
            Explore our curated gallery of high-converting social proof widgets. Choose from our 12 featured flagship templates or search through our 100+ specialized design variants.
          </p>

          {/* Navigation Mode Switcher */}
          <div className="inline-flex p-1 bg-white border border-purple-100 rounded-2xl shadow-xs mt-4">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "featured"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              ⭐ Featured (12 Standouts)
            </button>
            <button
              onClick={() => setActiveTab("catalog")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "catalog"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              📚 Full Catalog (100+)
            </button>
          </div>
        </div>

        {/* SECTION 1: 12 STANDOUT FEATURED SHOWCASE */}
        {activeTab === "featured" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-purple-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Flagship Designs</h2>
                <p className="text-xs text-gray-500">Our highest converting widgets engineered for instant setup.</p>
              </div>
              <span className="text-xs font-semibold text-purple-700 bg-purple-100/60 px-3 py-1 rounded-full border border-purple-200">
                12 Selected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURED_TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-2xl border border-purple-100 p-6 shadow-xs hover:border-purple-300 transition-all flex flex-col justify-between space-y-6 relative group"
                >
                  {/* Top Meta */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                        {template.badge}
                      </span>
                      <span className="text-xs font-medium text-gray-400">
                        {template.category}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {template.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed mt-1">
                        {template.description}
                      </p>
                    </div>
                  </div>

                  {/* Component Live Preview Box */}
                  <div className="bg-purple-50/40 rounded-xl border border-purple-100/80 p-4 relative">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                        Component Preview
                      </span>
                      {template.preview.isLive && (
                        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live
                        </span>
                      )}
                    </div>

                    <div className="bg-white rounded-xl p-3.5 shadow-xs border border-purple-100/60 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                        <TemplateIcon type={template.iconType} />
                      </div>
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {template.preview.title}
                        </p>
                        <p className="text-[11px] text-gray-500 font-normal leading-snug line-clamp-2">
                          {template.preview.subtitle}
                        </p>
                        {template.preview.rating && (
                          <div className="flex items-center gap-0.5 pt-1">
                            {Array.from({ length: template.preview.rating }).map((_, i) => (
                              <svg key={i} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        )}
                        {template.preview.time && (
                          <span className="text-[10px] font-medium text-gray-400 block pt-0.5">
                            {template.preview.time}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Link */}
                  <Link href={`/builder?template=${template.id}`}>
                    <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer text-center">
                      Use Template
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: 100+ CATALOG MATRIX WITH CATEGORIES & SEARCH */}
        {activeTab === "catalog" && (
          <section className="space-y-8">
            
            {/* Search & Filter Controls */}
            <div className="bg-white rounded-2xl border border-purple-100 p-4 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Search Input */}
                <div className="relative w-full sm:w-80">
                  <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search 100+ templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-gray-900 focus:outline-hidden focus:border-purple-400 transition-all"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-purple-600 text-white shadow-xs"
                          : "bg-purple-50/60 text-gray-600 hover:bg-purple-100/60 border border-purple-100/60"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-gray-400 font-medium pt-1">
                Showing <span className="text-gray-900 font-bold">{filteredCatalog.length}</span> templates in catalog
              </div>
            </div>

            {/* Catalog Grid Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCatalog.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-xl border border-purple-100 p-4 hover:border-purple-300 transition-all flex flex-col justify-between space-y-4 shadow-2xs group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                        {template.category}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-400">
                        {template.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 pt-1">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                        <TemplateIcon type={template.iconType} />
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                        {template.title}
                      </h4>
                    </div>

                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  <Link href={`/builder?template=${template.id}`}>
                    <button className="w-full py-1.5 bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 text-[11px] font-semibold rounded-lg transition-all cursor-pointer border border-purple-100">
                      Select
                    </button>
                  </Link>
                </div>
              ))}
            </div>

          </section>
        )}

      </main>
    </div>
  );
}

// --- SVG ICON COMPONENT ---
function TemplateIcon({ type }: { type: WidgetTemplate["iconType"] }) {
  switch (type) {
    case "shopping-bag":
      return (
        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case "zap":
      return (
        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "star":
      return (
        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    case "pulse":
      return (
        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    case "megaphone":
      return (
        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c.41 0 .789.24.96.618l.848 1.864m2.14 7.201a4 4 0 01-1.38 0l-2.14-.535" />
        </svg>
      );
    case "box":
      return (
        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
    case "user-plus":
      return (
        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      );
    case "shield":
      return (
        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "clock":
      return (
        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "trending-up":
      return (
        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    case "mail":
      return (
        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "gift":
      return (
        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V6a2 2 0 10-2 2h2zm-7 4h14M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      );
  }
}