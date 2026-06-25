/* ============================================================
   DMT WORLD — SITE CONFIG
   Edit this one file to wire up payments + live selling.
   ============================================================ */
window.DMT_CONFIG = {

  /* --- STRIPE (apparel checkout) ----------------------------
     1. Create a Stripe account → stripe.com
     2. Products > add each shirt ($23) > create a "Buy Button"
        (Stripe Dashboard > Payment Links / Buy Button).
     3. Paste your PUBLISHABLE key below (starts pk_live_ or pk_test_).
     4. Paste each product's buy-button-id into js/products.js
        (the "stripeBuyButtonId" field).
     When a product has a buy-button-id, the shop shows a real
     Stripe checkout button. Until then it falls back to the
     existing Etsy listing so the store still sells today. */
  stripePublishableKey: "",          // e.g. "pk_live_51N..."
  stripeEnabled: false,              // flip to true once keys are in

  /* --- LIVE SELLING (Whatnot / TikTok link-out) ------------- */
  live: {
    platform: "whatnot",             // "whatnot" | "tiktok"
    whatnotUrl: "https://www.whatnot.com/user/dmtworld",   // <-- set your Whatnot
    tiktokUrl:  "https://www.tiktok.com/@dmtworld/live",   // <-- set your TikTok
    nextShowISO: "",                 // optional countdown target, e.g. "2026-07-04T20:00:00"
    isLiveNow: false                 // flip true while streaming for the LIVE badge
  },

  /* --- SOCIAL + STORE LINKS --------------------------------- */
  links: {
    instagram: "https://www.instagram.com/dmtworld/",
    facebook:  "https://www.facebook.com/profile.php?id=100067500332608",
    etsy:      "https://www.etsy.com/shop/dmtworld",
    tiktok:    "https://www.tiktok.com/@dmtworld"
  }
};
