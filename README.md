# RAHOUI BOUMERDÈS

Restaurant website in French, built with Vite and TypeScript. The Desktop folder retains the spelling supplied in the brief; visitor-facing branding uses RAHOUI.

## Run

```sh
npm install
npm run dev
npm run build
npm run preview
```

The production output is `dist/`. Serve this directory over HTTP; opening its HTML directly as a file does not resolve the asset paths.

## Content maintenance

- `src/config/business.ts`: business identity, exact social and Maps links, production origin. Phone +213 673 55 48 84 is verified on the official Instagram and the supplied Google Maps listing. Email, WhatsApp and hours remain empty and hidden.
- `src/data/menu.ts`: category text and owner-approved dishes/prices. No demo items. Prices use Algerian dinars. Update only with confirmed current details.
- `src/data/gallery.ts`: gallery photographs, accessible descriptions and source URLs. This is a static selection, not a live Instagram feed.
- `src/content.ts`: French page content and accessible native-dialog interactions.
- `src/style.css`: brand palette, typography, all responsive layouts and reduced-motion support.
- `vite.config.ts`: canonical URL, Open Graph URL and factual Restaurant structured data, generated from the business config.

## Original assets

The logo is the supplied `bahoui boumerdes logo.jpg` found beside the project directory (150 × 150). It has not been redrawn or AI-upscaled.

Photographs were saved from posts on the restaurant's official public Instagram on 15 September 2026. No stock photographs, generated photographs or invented dishes were used. Source post URLs appear in `src/data/gallery.ts`; additional photographs:

- `facade.jpg`: https://www.instagram.com/rahoui.boumerdes/reel/DZ-qglcq46-/
- `celebration.jpg`: https://www.instagram.com/rahoui.boumerdes/reel/DairHQpqb3V/
- `plat.jpg`: https://www.instagram.com/rahoui.boumerdes/reel/Dc6vVq_qWIg/

Public social images are limited in resolution (mostly 361 × 640). For large desktop displays, the owner can supply original high-resolution exports under the same filenames. Copyright remains with the respective rights holders.

Fonts are self-hosted Cormorant Garamond and DM Sans from Fontsource. Their licenses are distributed with the packages. The website does not load a social embed or analytics, and contains no payment workflow. The reservation form prepares a local summary and opens a telephone call to Rahoui. It does not transmit an online booking or claim automatic confirmation.



## Reservations

`src/reservation.ts` handles date/time/party validation, safe summary rendering, and the verified telephone handoff. No personal information is stored. Rahoui confirms table availability during the call.
