import { defineConfig } from 'vite';
import { business } from './src/config/business';

export default defineConfig({
 plugins: [{
  name: 'rahoui-business-metadata',
  transformIndexHtml() {
   const origin = business.website.replace(/\/$/, '');
   return [
    { tag: 'link', attrs: { rel: 'canonical', href: `${origin}/` }, injectTo: 'head' },
    { tag: 'meta', attrs: { property: 'og:url', content: `${origin}/` }, injectTo: 'head' },
    { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify({
     '@context': 'https://schema.org', '@type': 'Restaurant', name: business.name,
     url: `${origin}/`, logo: `${origin}/images/rahoui-logo.jpg`,
     address: { '@type': 'PostalAddress', addressLocality: business.city, addressCountry: 'DZ' },
     hasMap: business.maps, sameAs: [business.instagram, business.tiktok],
    }).replace(/</g, '\\u003c'), injectTo: 'head' },
   ];
  },
 }],
});
