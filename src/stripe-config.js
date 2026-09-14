// Fill in a real Stripe Payment Link URL for each pack (Stripe Dashboard →
// Product catalog → pick the product → "..." → Create payment link) to make
// that pack purchasable. A pack with an empty string stays disabled in the
// shop ("Bientôt disponible").
//
// For each payment link, under "After payment" → "Confirmation page" →
// "Don't show confirmation page, redirect customers to your website",
// set the redirect URL to:
//   https://<your-domain>/?gem_pack=<packId>&session_id={CHECKOUT_SESSION_ID}
// (packId is the key below, e.g. "pack-small").
//
// SECURITY NOTE: with no backend, gems are credited client-side as soon as
// that URL loads — there is no server-side check that a real payment
// actually happened. That's enough to get a hobby-scale shop working
// without standing up a server, but a determined visitor could craft the
// same URL by hand and get free gems. Harden this later with a small
// backend (create the Checkout Session yourself, verify payment via a
// Stripe webhook, credit a per-player ledger there) before relying on it
// for real revenue at any scale.
export const STRIPE_PAYMENT_LINKS = {
  'pack-small': '',
  'pack-medium': '',
  'pack-large': '',
  'pack-xl': '',
};
