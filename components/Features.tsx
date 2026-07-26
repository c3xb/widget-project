export default function Features() {
  const features = [
    {
      title: "Countdown Timers",
      description: "Create urgency with fully customizable countdowns for flash sales, launches, or events.",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      badge: "Popular"
    },
    {
      title: "Social Proof & Testimonials",
      description: "Showcase customer reviews and testimonials dynamically to build instant credibility.",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-2.833A8.9 8.9 0 0 1 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      )
    },
    {
      title: "Seamless Embedding",
      description: "Copy a single line of HTML/JS script and embed it on any platform: Webflow, Shopify, WordPress, or custom sites.",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>
      )
    },
    {
      title: "Custom Styling",
      description: "Customize colors, fonts, borders, and animations to perfectly match your brand's unique identity.",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-2.22 4.283 9 9 0 0 1-4.07-4.07 3 3 0 0 0 4.283-2.22m1.907-2.193a21.983 21.983 0 0 0-4.217-4.217m10.97 10.97a21.983 21.983 0 0 0 4.217-4.217l-3-3a1.953 1.953 0 0 1 0-2.762l1.258-1.257a1.953 1.953 0 0 0-2.762-2.762l-1.257 1.258a1.953 1.953 0 0 1-2.762 0l-3-3a1.953 1.953 0 0 0-2.762 2.762L1.258 7.693a1.953 1.953 0 0 1 0 2.762l3 3a1.953 1.953 0 0 0 2.762 0l1.257-1.258a1.953 1.953 0 0 1 2.762 0l1.258 1.257Z" />
        </svg>
      )
    },
    {
      title: "Real-time Analytics",
      description: "Track impressions, clicks, and conversion rates directly from your unified dashboard.",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.75c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.875v-5.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      )
    },
    {
      title: "Lightning Fast Speed",
      description: "Engineered for speed, our widgets load asynchronously without ever slowing down your main page.",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="w-full max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Everything you need to <span className="text-purple-600">convert visitors</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Powerful features designed to help you build modern, beautiful widgets that integrate seamlessly into any workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group p-6 bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                  {feature.icon}
                </div>
                {feature.badge && (
                  <span className="px-2.5 py-0.5 text-xs font-bold text-purple-700 bg-purple-100 rounded-full">
                    {feature.badge}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-sm font-semibold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Learn more
              <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
