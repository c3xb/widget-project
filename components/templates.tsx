'use client';

/* ==============================================================
   ProofPad — Embeddable Widget Template Library
   --------------------------------------------------------------
   15 self-contained, production-ready social proof widgets.
   Every widget: white card + bg-purple-50 accents + purple-600
   buttons. Positioning (fixed / sticky / inline) is left to the
   consumer so each component stays portable across pages.

   Setup:
     npm i lucide-react   (if not already installed)

   Example embed usage:
     <div className="fixed bottom-4 left-4 z-50">
       <RecentPurchaseToast name="Alex P." product="the Growth plan" />
     </div>

   The default export at the bottom is a preview gallery of all
   15 templates — drop this file into a route to see them live,
   then import individual components into your real pages.
   ============================================================== */

import { useState, useEffect, type ReactNode } from 'react';
import {
  X,
  Star,
  CheckCircle2,
  MapPin,
  Eye,
  Quote,
  TrendingUp,
  Flame,
  ChevronLeft,
  ChevronRight,
  PartyPopper,
  ShoppingCart,
  Mail,
  BadgeCheck,
  Sparkles,
} from 'lucide-react';

/* 1. Recent Purchase Toast ------------------------------------ */
export interface RecentPurchaseToastProps {
  name?: string;
  location?: string;
  product?: string;
  timeAgo?: string;
  avatarUrl?: string;
}

export function RecentPurchaseToast({
  name = 'Sarah M.',
  location = 'New York, US',
  product = 'the Pro Plan',
  timeAgo = '2 minutes ago',
  avatarUrl,
}: RecentPurchaseToastProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="flex w-full max-w-sm items-start gap-3 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-purple-100">
      <div className="relative flex-shrink-0">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-11 w-11 rounded-full object-cover" />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 font-semibold text-purple-700">
            {name.charAt(0)}
          </div>
        )}
        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 ring-2 ring-white">
          <CheckCircle2 className="h-3 w-3 text-white" />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">{name}</span> purchased{' '}
          <span className="font-semibold">{product}</span>
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="h-3 w-3" /> {location} · {timeAgo}
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="flex-shrink-0 text-gray-300 transition-colors hover:text-gray-500"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

/* 2. Live Visitor Counter -------------------------------------- */
export interface LiveVisitorCounterProps {
  base?: number;
}

export function LiveVisitorCounter({ base = 23 }: LiveVisitorCounterProps) {
  const [count, setCount] = useState(base);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => Math.max(3, c + (Math.random() > 0.5 ? 1 : -1)));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md ring-1 ring-purple-100">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-600" />
      </span>
      <Eye className="h-4 w-4 text-purple-600" />
      <span className="text-sm font-medium text-gray-800">
        <span className="font-bold text-purple-700">{count}</span> people viewing this now
      </span>
    </div>
  );
}

/* 3. Testimonial Card ------------------------------------------ */
export interface TestimonialCardProps {
  quote?: string;
  name?: string;
  role?: string;
  rating?: number;
  avatarUrl?: string;
}

export function TestimonialCard({
  quote = 'ProofPad paid for itself in the first week. Conversions on our landing page jumped almost overnight.',
  name = 'Daniela Rossi',
  role = 'Founder, Loop Studio',
  rating = 5,
  avatarUrl,
}: TestimonialCardProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg ring-1 ring-purple-100">
      <Quote className="h-6 w-6 text-purple-300" />
      <div className="mt-2 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-purple-500 text-purple-500' : 'text-gray-200'}`}
          />
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-700">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4 flex items-center gap-3">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-700">
            {name.split(' ').map((n) => n[0]).join('')}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

/* 4. Trust Badge Bar --------------------------------------------- */
export interface TrustBadgeBarProps {
  label?: string;
  companies?: string[];
}

export function TrustBadgeBar({
  label = 'Trusted by teams at',
  companies = ['Nova', 'Fenwick', 'Aurelia', 'Kepler Labs', 'Drift & Co'],
}: TrustBadgeBarProps) {
  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-md ring-1 ring-purple-100">
      <p className="text-center text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {companies.map((c) => (
          <span key={c} className="text-lg font-semibold text-gray-400">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* 5. Rating Summary ----------------------------------------------- */
export interface RatingSummaryProps {
  average?: number;
  totalReviews?: number;
  breakdown?: number[]; // percentage for 5,4,3,2,1 stars
}

export function RatingSummary({
  average = 4.8,
  totalReviews = 1240,
  breakdown = [82, 12, 4, 1, 1],
}: RatingSummaryProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg ring-1 ring-purple-100">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-900">{average}</p>
          <div className="mt-1 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.round(average) ? 'fill-purple-500 text-purple-500' : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-500">{totalReviews.toLocaleString()} reviews</p>
        </div>
        <div className="flex-1 space-y-1">
          {breakdown.map((pct, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-3 text-xs text-gray-500">{5 - i}</span>
              <div className="h-1.5 flex-1 rounded-full bg-purple-100">
                <div className="h-1.5 rounded-full bg-purple-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 6. Urgency Countdown Banner -------------------------------------- */
export interface UrgencyCountdownBannerProps {
  endsInSeconds?: number;
  message?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export function UrgencyCountdownBanner({
  endsInSeconds = 3600 * 2 + 15 * 60,
  message = 'Flash sale ends in',
  ctaLabel = 'Claim discount',
  onCtaClick,
}: UrgencyCountdownBannerProps) {
  const [remaining, setRemaining] = useState(endsInSeconds);

  useEffect(() => {
    const id = setInterval(() => setRemaining((r) => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');
  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;

  return (
    <div className="flex w-full flex-col items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-md ring-1 ring-purple-100 sm:flex-row">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
        <Flame className="h-4 w-4 text-purple-600" />
        {message}
        <span className="rounded-md bg-purple-50 px-2 py-1 font-mono text-sm font-semibold text-purple-700">
          {pad(h)}:{pad(m)}:{pad(s)}
        </span>
      </div>
      <button
        onClick={onCtaClick}
        className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-700"
      >
        {ctaLabel}
      </button>
    </div>
  );
}

/* 7. Recent Signup Notification -------------------------------------- */
export interface RecentSignupNotificationProps {
  name?: string;
  plan?: string;
  timeAgo?: string;
}

export function RecentSignupNotification({
  name = 'James K.',
  plan = 'the free trial',
  timeAgo = 'just now',
}: RecentSignupNotificationProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-xl bg-white py-3 pl-3 pr-4 shadow-lg ring-1 ring-purple-100">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-purple-600">
        <Sparkles className="h-4 w-4 text-white" />
      </div>
      <p className="flex-1 text-sm text-gray-700">
        <span className="font-semibold text-gray-900">{name}</span> signed up for {plan}
        <span className="ml-1 text-gray-400">· {timeAgo}</span>
      </p>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="text-gray-300 transition-colors hover:text-gray-500"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

/* 8. Low Stock Alert ---------------------------------------------- */
export interface LowStockAlertProps {
  itemsLeft?: number;
  productName?: string;
}

export function LowStockAlert({ itemsLeft = 3, productName = 'this item' }: LowStockAlertProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-purple-100">
      <Flame className="h-4 w-4 text-purple-600" />
      <p className="text-sm text-gray-700">
        Only <span className="font-semibold text-purple-700">{itemsLeft} left</span> of {productName}{' '}
        — order soon
      </p>
    </div>
  );
}

/* 9. Live Sales Counter -------------------------------------------- */
export interface LiveSalesCounterProps {
  base?: number;
  label?: string;
}

export function LiveSalesCounter({ base = 152, label = 'sold today' }: LiveSalesCounterProps) {
  const [count, setCount] = useState(base);

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 0.6) setCount((c) => c + 1);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex w-full max-w-xs items-center gap-3 rounded-2xl bg-white p-4 shadow-md ring-1 ring-purple-100">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50">
        <TrendingUp className="h-5 w-5 text-purple-600" />
      </div>
      <div>
        <p className="text-lg font-bold text-gray-900">{count.toLocaleString()}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

/* 10. Review Carousel ------------------------------------------------ */
interface Review {
  quote: string;
  name: string;
  rating: number;
}

export interface ReviewCarouselProps {
  reviews?: Review[];
}

const defaultReviews: Review[] = [
  { quote: 'Setup took five minutes and the widgets just work.', name: 'Priya S.', rating: 5 },
  { quote: 'Our signup rate is up 18% since adding the live counter.', name: 'Tom H.', rating: 5 },
  { quote: 'Clean, fast, and it actually looks good on our site.', name: 'Elena V.', rating: 4 },
];

export function ReviewCarousel({ reviews = defaultReviews }: ReviewCarouselProps) {
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((i) => (i + 1) % reviews.length);

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg ring-1 ring-purple-100">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < review.rating ? 'fill-purple-500 text-purple-500' : 'text-gray-200'}`}
          />
        ))}
      </div>
      <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-gray-700">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">{review.name}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous review"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-50 text-purple-600 transition-colors hover:bg-purple-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next review"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-50 text-purple-600 transition-colors hover:bg-purple-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* 11. As Seen On Bar -------------------------------------------------- */
export interface AsSeenOnBarProps {
  outlets?: string[];
}

export function AsSeenOnBar({
  outlets = ['TechCrunch', 'Product Hunt', 'Indie Hackers', 'The Verge'],
}: AsSeenOnBarProps) {
  return (
    <div className="w-full rounded-2xl bg-white p-5 shadow-sm ring-1 ring-purple-100">
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-purple-700">
        As featured in
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {outlets.map((o) => (
          <span key={o} className="text-sm font-medium text-gray-500">
            {o}
          </span>
        ))}
      </div>
    </div>
  );
}

/* 12. Milestone Announcement -------------------------------------------- */
export interface MilestoneAnnouncementProps {
  message?: string;
}

export function MilestoneAnnouncement({
  message = 'We just crossed 10,000 happy customers!',
}: MilestoneAnnouncementProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-purple-100">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-600">
        <PartyPopper className="h-5 w-5 text-white" />
      </div>
      <p className="flex-1 text-sm font-medium text-gray-800">{message}</p>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="text-gray-300 transition-colors hover:text-gray-500"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

/* 13. Cart Activity Notification ------------------------------------------ */
export interface CartActivityNotificationProps {
  count?: number;
  productName?: string;
}

export function CartActivityNotification({
  count = 5,
  productName = 'this item',
}: CartActivityNotificationProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md ring-1 ring-purple-100">
      <ShoppingCart className="h-4 w-4 text-purple-600" />
      <p className="text-sm text-gray-700">
        <span className="font-semibold text-purple-700">{count} people</span> have {productName} in
        their cart
      </p>
    </div>
  );
}

/* 14. Newsletter Social Proof Form ------------------------------------------ */
export interface NewsletterSocialProofFormProps {
  subscriberCount?: number;
  onSubmit?: (email: string) => void;
}

export function NewsletterSocialProofForm({
  subscriberCount = 3400,
  onSubmit,
}: NewsletterSocialProofFormProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.includes('@')) return;
    onSubmit?.(email);
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg ring-1 ring-purple-100">
      <div className="flex items-center gap-2">
        <Mail className="h-5 w-5 text-purple-600" />
        <p className="text-sm font-semibold text-gray-900">Get updates in your inbox</p>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Join {subscriberCount.toLocaleString()}+ subscribers already reading
      </p>
      {submitted ? (
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-purple-700">
          <CheckCircle2 className="h-4 w-4" /> You&apos;re on the list.
        </p>
      ) : (
        <div className="mt-3 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-lg border border-purple-100 bg-purple-50/50 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
          />
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-700"
          >
            Join
          </button>
        </div>
      )}
    </div>
  );
}

/* 15. Verified Purchase Badge -------------------------------------------------- */
export interface VerifiedPurchaseBadgeProps {
  label?: string;
}

export function VerifiedPurchaseBadge({ label = 'Verified Purchase' }: VerifiedPurchaseBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 ring-1 ring-purple-200">
      <BadgeCheck className="h-3.5 w-3.5 text-purple-600" />
      <span className="text-xs font-medium text-purple-700">{label}</span>
    </div>
  );
}

/* ==============================================================
   Showcase gallery — preview every template in one place.
   Delete this section once you're only importing individual
   components into your product pages.
   ============================================================== */

const templates: { name: string; description: string; node: ReactNode }[] = [
  { name: 'Recent Purchase Toast', description: 'Floating card announcing a fresh sale', node: <RecentPurchaseToast /> },
  { name: 'Live Visitor Counter', description: 'Real-time pill showing active viewers', node: <LiveVisitorCounter /> },
  { name: 'Testimonial Card', description: 'Quote with rating and attribution', node: <TestimonialCard /> },
  { name: 'Trust Badge Bar', description: 'Row of client or partner names', node: <TrustBadgeBar /> },
  { name: 'Rating Summary', description: 'Average score with a star breakdown', node: <RatingSummary /> },
  { name: 'Urgency Countdown Banner', description: 'Live countdown driving a deadline', node: <UrgencyCountdownBanner /> },
  { name: 'Recent Signup Notification', description: 'Toast for a new account or trial', node: <RecentSignupNotification /> },
  { name: 'Low Stock Alert', description: 'Inline nudge near a limited product', node: <LowStockAlert /> },
  { name: 'Live Sales Counter', description: 'Ticking total of units sold today', node: <LiveSalesCounter /> },
  { name: 'Review Carousel', description: 'Click-through set of short reviews', node: <ReviewCarousel /> },
  { name: 'As Seen On Bar', description: 'Press or media mention strip', node: <AsSeenOnBar /> },
  { name: 'Milestone Announcement', description: 'One-off banner for a big number', node: <MilestoneAnnouncement /> },
  { name: 'Cart Activity Notification', description: 'Shows demand on the current product', node: <CartActivityNotification /> },
  { name: 'Newsletter Social Proof Form', description: 'Signup form with subscriber count', node: <NewsletterSocialProofForm /> },
  { name: 'Verified Purchase Badge', description: 'Small trust seal for reviews or listings', node: <VerifiedPurchaseBadge /> },
];

export default function ProofPadTemplateGallery() {
  return (
    <div className="min-h-screen bg-purple-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-gray-900">ProofPad Widget Templates</h1>
        <p className="mt-1 text-sm text-gray-600">
          15 embeddable social proof widgets. Import any named component above into your product.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {templates.map((t) => (
            <div key={t.name} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-purple-100">
              <p className="text-sm font-semibold text-gray-900">{t.name}</p>
              <p className="mt-0.5 text-xs text-gray-500">{t.description}</p>
              <div className="mt-4 flex items-center justify-center rounded-xl bg-purple-50 p-6">
                {t.node}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}