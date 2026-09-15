import { business as b } from './config/business';
import { menu } from './data/menu';
import { gallery } from './data/gallery';

const external = (url: string, label: string, cls = '') => `<a class="${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const image = (src: string, alt: string, cls = '') => `<img class="${cls}" src="/images/${src}" alt="${alt}" width="361" height="640" loading="lazy" decoding="async" />`;

export function renderContent() {
 document.querySelector('#rest')!.outerHTML = `
 <section id="maison" class="maison section-wrap">
  <div class="section-label"><span class="eyebrow">01 — LA MAISON</span><span class="fine-line"></span></div>
  <div class="maison-layout"><div class="maison-images"><figure class="facade">${image('facade.jpg','La façade de Rahoui Boumerdès éclairée à la nuit tombée')}<figcaption>Une adresse à Boumerdès.</figcaption></figure><figure class="maison-detail">${image('celebration.jpg','Gâteau blanc et roses rouges devant l’emblème Rahoui')}</figure></div>
   <div class="maison-copy"><h2>On vient pour <br>le goût.<br><em>On reste pour <br>le moment.</em></h2><p>Un café entre amis, un déjeuner en famille, une pâtisserie qui attire le regard. À Boumerdès, Rahoui réunit ces petits plaisirs dans une même adresse.</p><p>À chacun sa façon de prendre le temps.</p><a class="text-link" href="#carte">Les envies du moment <span aria-hidden="true">↗</span></a></div>
  </div>
 </section>
 <section id="carte" class="carte section-wrap">
  <div class="section-label"><span class="eyebrow">02 — LA CARTE</span><span class="fine-line"></span></div>
  <div class="carte-heading"><h2>Selon<br><em>vos envies.</em></h2><p>Du café à la pâtisserie,<br>en passant par la table.<br>La carte complète se découvre sur place.</p></div>
  <div class="menu-layout"><figure class="menu-photo">${image('plat.jpg','Une assiette dressée dans la cuisine de Rahoui')}<figcaption>À table, simplement.</figcaption></figure><div class="menu-list">${menu.map((cat,i)=>`<details class="menu-category"${i===0?' open':''}><summary><span class="menu-number">0${i+1}</span><h3>${cat.name}</h3><span class="plus" aria-hidden="true"></span></summary><div class="menu-description"><p>${cat.description}</p>${cat.items.length?`<ul>${cat.items.map(item=>`<li><span>${item.name}${item.description?`<small>${item.description}</small>`:''}</span><span>${item.priceDZD.toLocaleString('fr-DZ')} DA</span></li>`).join('')}</ul>`:''}</div></details>`).join('')}<p class="menu-note">Pour les choix du jour et les tarifs,<br>notre équipe vous renseigne sur place.</p>${external(b.maps,'Venir chez Rahoui <span aria-hidden="true">↗</span>','text-link')}</div></div>
 </section>
 <section id="patisserie" class="patisserie">
  <div class="pastry-title"><p class="eyebrow">03 — PÂTISSERIE</p><h2>À choisir avec<br><em>les yeux d’abord.</em></h2></div>
  <div class="pastry-image"><img src="/images/gateau.jpg" width="577" height="640" alt="Gâteau de célébration Rahoui orné de roses et de décors blancs" loading="lazy" decoding="async" /></div>
  <div class="pastry-caption"><p>Les petites douceurs.<br>Et les grandes occasions.</p><a class="text-link" href="#galerie">Voir la galerie <span aria-hidden="true">↗</span></a></div>
 </section>
 <section id="galerie" class="gallery section-wrap">
  <div class="section-label"><span class="eyebrow">04 — INSTANTS RAHOUI</span><span class="fine-line"></span></div>
  <div class="gallery-heading"><h2>Un peu de<br><em>la maison.</em></h2><p>À la vitrine, en cuisine, au comptoir.<br>Quelques images de Rahoui.</p></div>
  <div class="gallery-grid">${gallery.map((photo,i)=>`<figure class="gallery-item gallery-${i}"><button class="gallery-button" data-photo="${i}" aria-label="Agrandir : ${photo.label}"><img src="${photo.src}" width="${photo.width}" height="${photo.height}" alt="${photo.alt}" loading="lazy" decoding="async"/><span class="zoom-icon" aria-hidden="true">+</span></button><figcaption><span>0${i+1}</span>${photo.label}</figcaption></figure>`).join('')}</div>
  <p class="gallery-credit">Photographies de ${external(b.instagram,b.handle)}.</p>
 </section>
 <section class="social section-wrap" aria-labelledby="social-title"><p class="eyebrow">SUIVEZ RAHOUI</p><div class="social-layout"><h2 id="social-title">La suite<br><em>au quotidien.</em></h2><div class="social-links">${external(b.instagram,`<span><strong>Instagram</strong><small>${b.handle}</small></span><span aria-hidden="true">↗</span>`,'social-link')}${external(b.tiktok,`<span><strong>TikTok</strong><small>${b.handle}</small></span><span aria-hidden="true">↗</span>`,'social-link')}</div></div></section>
 <section id="contact" class="contact section-wrap"><div class="section-label"><span class="eyebrow">05 — RETROUVEZ-NOUS</span><span class="fine-line"></span></div><div class="contact-layout"><div><h2>On se retrouve<br><em>à Boumerdès.</em></h2><div class="address"><h3>Rahoui Boumerdes</h3><p>Boumerdès, Algérie</p></div>${external(b.maps,'Ouvrir dans Google Maps <span aria-hidden="true">↗</span>','button button-dark')}<p class="contact-note">Votre itinéraire jusqu’à Rahoui,<br>directement dans Google Maps.</p></div><figure class="contact-photo">${image('facade.jpg','Entrée du restaurant et de la pâtisserie Rahoui Boumerdès')}${external(b.maps,'Voir sur Google Maps ↗','photo-location')}</figure></div></section>
 <footer><div class="footer-main"><a href="#accueil" class="footer-brand" aria-label="Rahoui, retour à l’accueil"><img src="/images/rahoui-logo.jpg" alt="Rahoui — Pâtisserie Restaurant" width="150" height="150" loading="lazy" /></a><div class="footer-identity"><p class="footer-name">RAHOUI</p><p>Café · Pâtisserie · Restaurant</p><p class="eyebrow">BOUMERDÈS — ALGÉRIE</p></div><nav aria-label="Navigation de pied de page"><a href="#maison">La Maison</a><a href="#carte">La Carte</a><a href="#patisserie">Pâtisserie</a><a href="#galerie">Galerie</a><a href="#contact">Contact</a></nav><nav aria-label="Réseaux et adresse">${external(b.instagram,'Instagram ↗')}${external(b.tiktok,'TikTok ↗')}${external(b.maps,'Google Maps ↗')}</nav></div><div class="footer-bottom"><span>© 2026 Rahoui Boumerdes</span><a href="#accueil">Retour en haut ↑</a></div></footer>
 <nav class="mobile-actions" aria-label="Accès rapide">${external(b.instagram,'Instagram')}${external(b.maps,'Itinéraire ↗')}<a href="#carte">La Carte</a></nav>
 <dialog id="mobile-navigation" class="mobile-navigation" aria-label="Navigation"><div class="mobile-nav-top"><span class="eyebrow">RAHOUI BOUMERDÈS</span><button class="close-menu" aria-label="Fermer le menu">Fermer ×</button></div><nav aria-label="Navigation mobile">${[['accueil','Accueil'],['maison','La Maison'],['carte','La Carte'],['patisserie','Pâtisserie'],['galerie','Galerie'],['contact','Contact']].map(([id,name],i)=>`<a href="#${id}"><small>0${i+1}</small>${name}</a>`).join('')}</nav>${external(b.maps,'Nous trouver ↗','button button-dark')}<p class="eyebrow">BOUMERDÈS — ALGÉRIE</p></dialog>
 <dialog class="lightbox" aria-label="Galerie de photographies"><button class="lightbox-close" aria-label="Fermer la galerie">Fermer ×</button><div class="lightbox-layout"><button class="lightbox-prev" aria-label="Photo précédente">←</button><figure><img alt=""/><figcaption aria-live="polite"></figcaption></figure><button class="lightbox-next" aria-label="Photo suivante">→</button></div><p class="lightbox-help">← → pour parcourir · Échap pour fermer</p></dialog>`;

 document.querySelector('#app')!.append(document.querySelector('footer')!);
 const header = document.querySelector<HTMLElement>('.site-header')!;
 const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 35);
 updateHeader(); window.addEventListener('scroll',updateHeader,{passive:true});
 const mobile = document.querySelector<HTMLDialogElement>('#mobile-navigation')!;
 const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
 toggle.addEventListener('click',()=>{mobile.showModal();toggle.setAttribute('aria-expanded','true');document.body.classList.add('modal-open')});
 const closeMobile = () => mobile.close();
 mobile.querySelector('.close-menu')!.addEventListener('click',closeMobile);
 mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMobile));
 mobile.addEventListener('close',()=>{toggle.setAttribute('aria-expanded','false');document.body.classList.remove('modal-open')});

 const lightbox = document.querySelector<HTMLDialogElement>('.lightbox')!;
 let active = 0;
 function showPhoto(i: number) {active = (i+gallery.length)%gallery.length; const photo=gallery[active]; const img=lightbox.querySelector('img')!;img.src=photo.src;img.alt=photo.alt;lightbox.querySelector('figcaption')!.textContent=`${String(active+1).padStart(2,'0')} / ${String(gallery.length).padStart(2,'0')} — ${photo.label}`;}
 document.querySelectorAll<HTMLButtonElement>('[data-photo]').forEach(button=>button.addEventListener('click',()=>{showPhoto(Number(button.dataset.photo));lightbox.showModal();document.body.classList.add('modal-open')}));
 lightbox.querySelector('.lightbox-close')!.addEventListener('click',()=>lightbox.close());
 lightbox.querySelector('.lightbox-prev')!.addEventListener('click',()=>showPhoto(active-1));
 lightbox.querySelector('.lightbox-next')!.addEventListener('click',()=>showPhoto(active+1));
 lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(active+1)}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(active-1)}});
 lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
 lightbox.addEventListener('close',()=>document.body.classList.remove('modal-open'));
 let touchStart = 0;
 lightbox.addEventListener('touchstart',e=>{touchStart=e.changedTouches[0].screenX},{passive:true});
 lightbox.addEventListener('touchend',e=>{const delta=e.changedTouches[0].screenX-touchStart;if(Math.abs(delta)>70)showPhoto(active+(delta<0?1:-1))},{passive:true});
}
