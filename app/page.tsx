<<<<<<< HEAD
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
=======
'use client'; // Required for React state management

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import InteractiveDemo from '@/components/InteractiveDemo';
import EmbedModal from '@/components/EmbedModal';
import WidgetTemplatesPage from '@/components/templates';
import Footer from '@/components/Footer';
>>>>>>> a2ed180c973a52c55edeab2885d77e031595c5aa

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Replace with dynamic widget ID from your database/state
  const sampleWidgetId = "671c008c-30c7-4309-8239-281b3b334582";

  return (
<<<<<<< HEAD
    <main className="min-h-screen bg-purple-50 text-gray-900">
      <Header />
      <Hero />
      <Features />
=======
    <main className="min-h-screen bg-purple-50 text-gray-900 animate-popup">
      <Header />
      <Hero />
      <Features />
      
      {/* You can pass setIsModalOpen to trigger opening the modal */}
      <InteractiveDemo onPublish={() => setIsModalOpen(true)} />

      {/* Correctly passing the required props */}
      <EmbedModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        widgetId={sampleWidgetId} 
      />
      <WidgetTemplatesPage/>
      <Footer/>
>>>>>>> a2ed180c973a52c55edeab2885d77e031595c5aa
    </main>
  );
}