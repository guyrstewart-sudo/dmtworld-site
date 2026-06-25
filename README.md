# DMT WORLD — Website + Brand Kit

The complete trippy, on-brand website for **DMT World** — psychedelic art apparel.
*"The Secret Dwells Within."* Static, fast, and ready for GitHub Pages.

---

## 📁 What's in here

```
DMT WORLD/
├── index.html              Home — hyperspace hero + winking machine elf
├── shop.html               Shop — all 33 tees, filters, Stripe/Etsy checkout
├── live.html               Live drops — Whatnot/TikTok link-out + countdown
├── about.html              Brand story
├── brandbook.html          Interactive web brand book
├── config.js               ⭐ EDIT THIS — Stripe keys, live links, socials
├── css/styles.css          Full design system
├── js/products.js          All 33 products (add Stripe IDs here)
├── js/site.js              Animations, shop engine, checkout, countdown
├── assets/logo.svg         Brand mark
├── assets/products/        (optional) drop real photos here: <product-id>.jpg
├── brand/                  Brand book source (.md) + product/shop copy + JSON
├── DMT-World-Brand-Book.pdf  18-page designed PDF brand portfolio book
└── build/                  PDF generator script (not deployed)
```

The shop works **today** via your existing Etsy store. Stripe one-click checkout
switches on the moment you add keys — no code changes needed.

---

## 🚀 Deploy to GitHub Pages (free)

1. Create a repo, e.g. `dmtworld-site`.
2. Upload everything in this folder to the repo root (keep the folder structure).
3. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
4. Branch: `main`, folder: `/ (root)` → **Save**.
5. Live in ~1 minute at `https://<username>.github.io/dmtworld-site/`.

**Custom domain later:** buy a domain → in **Settings → Pages → Custom domain**
enter `dmtworld.com` → add the DNS records GitHub shows (A records to GitHub's IPs
+ a CNAME for `www`). Tick **Enforce HTTPS** once it provisions.

> Tip: open `index.html` directly in a browser to preview first — everything works
> offline because the product data is embedded (no server needed).

---

## 💳 Turn on Stripe checkout (sell apparel)

GitHub Pages can't run a server, so we use Stripe's **Buy Buttons** (Stripe-hosted,
no backend). Steps:

1. Make a free account at **stripe.com**.
2. **Products** → add each shirt ($23). For each, create a **Buy Button**
   (Stripe Dashboard → *Payment links / Buy button*). Copy its **buy-button-id**.
3. In `config.js` set your **publishable key** and `stripeEnabled: true`:
   ```js
   stripePublishableKey: "pk_live_xxx",
   stripeEnabled: true,
   ```
4. In `js/products.js`, paste each id into the matching product's `stripeBuyButtonId`.
5. Done — that product's "View / Buy" now opens a real Stripe checkout. Any product
   without an id keeps selling through Etsy automatically.

*(Prefer a full cart with inventory? Swap in a Shopify "Buy Button" embed later —
the card layout is ready for it.)*

---

## 🔴 Live selling (Whatnot / TikTok)

Live video can't be hosted on GitHub Pages, so the **Live** page routes fans to
your live-shopping platform. In `config.js → live`:

```js
live: {
  platform: "whatnot",                 // or "tiktok"
  whatnotUrl: "https://whatnot.com/user/dmtworld",
  tiktokUrl:  "https://tiktok.com/@dmtworld/live",
  nextShowISO: "2026-07-04T20:00:00",  // shows a live countdown
  isLiveNow: false                     // set true while streaming → LIVE badge
}
```

Set up a free seller account on **whatnot.com** (built for live drops) or use
**TikTok LIVE** + TikTok Shop, then drop your URL above.

---

## 🖼️ Product photos

Every product already shows its **real photo**, pulled live from the DMT World Etsy
CDN (the `image` field in `js/products.js`). If an image ever fails to load, the card
gracefully falls back to generated trippy art.

Want fully self-hosted images instead of hotlinking Etsy? Drop square files into
`assets/products/` named by product id (e.g. `assets/products/youniverse.jpg`) and
blank out that product's `image` field — the local file takes over. (Product ids are
listed in `js/products.js`.)

---

## 🎨 Brand kit

- **Colors:** Void `#05010D` · Bone `#F4EEFF` · Magenta `#FF2BAE` · Elf-Green `#00FFA3`
  · Violet `#B026FF` · Cyan `#18E0FF` · Gold `#FFD447`
- **Type:** Syne (display) · Space Grotesk (body) · Space Mono (labels)
- **Full guidelines:** `DMT-World-Brand-Book.pdf` and `brandbook.html`

---

## ⚖️ Note

This is **expressive art apparel**. The site never sells, sources, or instructs on
any controlled substance — every page carries that framing. Keep it that way as you
add content.

*The secret dwells within. :)*
