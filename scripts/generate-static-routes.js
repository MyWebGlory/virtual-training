/**
 * Post-build script: generates a static index.html for every SPA route so that
 * crawlers / social-sharing bots (which don't execute JS) see the correct
 * <title>, meta description, og:*, and twitter:* tags.
 *
 * Usage: node scripts/generate-static-routes.js
 * (run right after `vite build`)
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "../dist");
const template = readFileSync(join(distDir, "index.html"), "utf-8");

// ─── Route definitions ────────────────────────────────────────────────────────
const routes = [
  {
    path: "/",
    title: "Virtual Producers – Expert Production for Corporate Cohort Training",
    description:
      "Stop risking your program's credibility. We handle every technical detail for corporate cohorts of 50+ participants, so your facilitators can focus on delivery.",
    canonical: "https://www.vmproducers.com/",
    ogImage: "https://www.vmproducers.com/og-image.png",
  },
  {
    path: "/thank-you",
    title: "You're Booked | Virtual Producers",
    description:
      "You just made the best move for your virtual training program. Here's what happens next with your Virtual Producers strategy call.",
    canonical: "https://www.vmproducers.com/thank-you",
    ogImage: "https://www.vmproducers.com/og-image.png",
  },
];

// ─── Helper: patch all meta tags in the HTML string ──────────────────────────
function patchHtml(html, route) {
  let out = html;

  // <title>
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);

  // <meta name="description">
  out = out.replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${escAttr(route.description)}$2`
  );

  // <link rel="canonical">
  out = out.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
    `$1${route.canonical}$2`
  );

  // og:url
  out = out.replace(
    /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
    `$1${route.canonical}$2`
  );

  // og:title
  out = out.replace(
    /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
    `$1${escAttr(route.title)}$2`
  );

  // og:description
  out = out.replace(
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    `$1${escAttr(route.description)}$2`
  );

  // og:image
  out = out.replace(
    /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
    `$1${route.ogImage}$2`
  );

  // twitter:title
  out = out.replace(
    /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
    `$1${escAttr(route.title)}$2`
  );

  // twitter:description
  out = out.replace(
    /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
    `$1${escAttr(route.description)}$2`
  );

  // twitter:image
  out = out.replace(
    /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
    `$1${route.ogImage}$2`
  );

  return out;
}

function escAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// ─── Generate per-route HTML files ───────────────────────────────────────────
for (const route of routes) {
  const patched = patchHtml(template, route);

  if (route.path === "/") {
    // Overwrite the root index.html
    writeFileSync(join(distDir, "index.html"), patched);
    console.log("✓  /  →  dist/index.html");
  } else {
    // Create a subdirectory with its own index.html
    const subDir = join(distDir, route.path.replace(/^\//, ""));
    mkdirSync(subDir, { recursive: true });
    writeFileSync(join(subDir, "index.html"), patched);
    console.log(`✓  ${route.path}  →  dist${route.path}/index.html`);
  }
}

console.log("\nStatic route HTML generation complete.");
