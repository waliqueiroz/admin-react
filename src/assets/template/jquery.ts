/* eslint-disable @typescript-eslint/no-explicit-any */
import jquery from 'admin-lte/plugins/jquery/jquery.min.js';

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

window.$ = jquery;
window.jQuery = jquery;
