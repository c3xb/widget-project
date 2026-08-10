(function (){
    function getWidgetId(){
      const currentScript = document.currentScript || document.querySelector('script[data-widget-id]');
      return currentScript ? currentScript.getAttribute('data-widget-id') : null
    }
   async function fetchConfig(id) {
  try {
    // Reads origin from currentScript without re-writing query selectors
    const baseUrl = document.currentScript ? new URL(document.currentScript.src).origin : '';

    const res = await fetch(`${baseUrl}/api/widget/${id}`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to load widget:", error);
    return null;
  }
} 

    function renderWidget(config) {
  if (!config) return;

  // Create the widget container
  const container = document.createElement('div');
  container.id = `proofpad-widget-${config.id}`;

  // Apply inline styles so host CSS doesn't break it
  Object.assign(container.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#000409',
    color: '#ffffff',
    padding: '16px',
    borderRadius: '12px',
    fontFamily: 'sans-serif',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)',
    zIndex: '999999'
  });

  // Inject markup
  container.innerHTML = `
    <div style="font-size: 14px; font-weight: bold; margin-bottom: 4px;">${config.customer_name}</div>
    <div style="font-size: 12px; color: #9ba3b3;">${config.content || 'Verified customer proof'}</div>
  `;

  // Append to the host page
  document.body.appendChild(container);
 }

  async function init() {
  const id = getWidgetId();
  if (!id) {
    console.error('[ProofPad] Missing data-widget-id attribute on script tag.');
    return;
  }

  const config = await fetchConfig(id);
  
   if(config){
     renderWidget(config);
   }
 
}

// Run init once the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
})();