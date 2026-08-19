'use client'


export default function Hero() {
  
  const scrollToSection = (id: string) => {
  // If you are on the homepage:
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    // If you are on another page (like /profile), go to home first:
    window.location.href = `/#${id}`;
  }
};
  return (
    <main className="w-full flex flex-col items-center justify-center px-4 pt-28 pb-20 text-center">
      
      {/* شارة صغيرة أعلى العنوان (Badge) */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
        <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
        No-Code Widget Builder
      </div>

      {/* العنوان الرئيسي (Heading) */}
      <h1 className="max-w-4xl text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
        The simplest way to add <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
          powerful widgets
        </span> to your site.
      </h1>

      {/* الوصف الصغير (Description) */}
      <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
        Generate beautiful, fast, and embeddable widgets like countdowns and testimonials in seconds. 
        Engage your visitors and boost conversions without writing a single line of code.
      </p>

      {/* أزرار اتخاذ الإجراء (CTA Buttons) */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <button onClick={(e) => {
    e.preventDefault(); // Stops the browser from changing the URL or hard jumping
    scrollToSection('editor'); // Runs your smooth scroll function
  }}  className="w-full sm:w-auto px-8 py-3.5 bg-purple-600 text-white rounded-xl font-semibold text-lg hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/30 cursor-pointer">
          Start Building for Free
        </button>
        
        <button onClick={(e) => {
    e.preventDefault(); // Stops the browser from changing the URL or hard jumping
    scrollToSection('templates'); // Runs your smooth scroll function
  }} className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all cursor-pointer">
          View Templates
        </button>
      </div>

    </main>
  );
}