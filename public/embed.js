(function (){
    function getWidgetId(){
      const currentScript = document.currentScript || document.querySelector('script[data-widget-id]');
      return currentScript ? currentScript.getAttribute('data-widget-id') : null
    }
    async function fetchConfig(id){
      
    }
})();