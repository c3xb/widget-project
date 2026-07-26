export default function Features() {
    const features = [
        {
            icon: (
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Lightning Fast Load",
            description: "Our widgets are micro-sized (<10KB) so your website speed and SEO rankings stay top-notch.",
        },
        {
            icon: (
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            title: "No-Code Integration",
            description: "Simply copy one single line of JavaScript script and paste it into Shopify, WordPress, or Webflow.",
        },
        {
            icon: (
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            title: "100% Mobile Responsive",
            description: "Widgets automatically adjust to look crisp, professional, and clean on smartphones and desktop screens alike.",
        },
        {
            icon: (
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: "Real-time Analytics",
            description: "Track total views, click-through rates (CTR), and conversions for every widget directly from your dashboard.",
        },
    ];

    return (
        <section id="features" className="w-full py-20 px-4 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                    Everything you need to grow conversions
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Designed specifically for founders and creators who want quick social proof without complex setups.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300"
                    >
                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-5">
                            {item.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}