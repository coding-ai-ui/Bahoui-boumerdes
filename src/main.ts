import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import './style.css';
import { business as b } from './config/business';
import { renderContent } from './content';

const external = (url: string, label: string, cls = '') => `<a class="${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const logo = `<img class="logo" src="/images/rahoui-logo.jpg" width="150" height="150" alt="Rahoui — Pâtisserie Restaurant" />`;
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<a class="skip-link" href="#main">Aller au contenu</a>
<header class="site-header">
 <nav class="desktop-nav nav-left" aria-label="Navigation principale"><a href="#accueil">Accueil</a><a href="#maison">La Maison</a><a href="#carte">La Carte</a></nav>
 <a class="brand" href="#accueil" aria-label="Rahoui, accueil">${logo}</a>
 <nav class="desktop-nav nav-right" aria-label="Suite de la navigation"><a href="#patisserie">Pâtisserie</a><a href="#galerie">Galerie</a><a href="#contact">Contact</a>${external(b.maps,'Nous trouver ↗','nav-cta')}</nav>
 <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-navigation">Menu <span aria-hidden="true">☰</span></button>
</header>
<main id="main">
 <section id="accueil" class="hero">
  <div class="hero-copy"><p class="eyebrow">RAHOUI BOUMERDÈS</p><h1>Une adresse<br>à <em>savourer.</em></h1><p class="hero-description">Le temps d’un café.<br>Le plaisir de se retrouver.</p><a class="button button-light" href="#carte">Découvrir la carte <span aria-hidden="true">↗</span></a><p class="hero-category">CAFÉ <span>·</span> PÂTISSERIE <span>·</span> RESTAURANT</p></div>
  <figure class="hero-photo"><img src="/images/patisserie.jpg" width="361" height="640" alt="Pâtisserie Rahoui garnie de crème et décorée d’une tuile dorée" fetchpriority="high"/><figcaption>La pâtisserie, chez Rahoui.</figcaption></figure>
  <div class="hero-bottom"><span>BOUMERDÈS — ALGÉRIE</span><a href="#maison">Prenez le temps <span aria-hidden="true">↓</span></a></div>
 </section>
 <div id="rest"></div>
</main>`;
renderContent();
