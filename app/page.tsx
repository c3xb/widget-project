import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WidgetEditor from "@/components/WidgetBuilder";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-purple-50 text-gray-900">
      <Header />
      <Hero />
      <Features />
      <WidgetEditor />
    </main>
  );
}