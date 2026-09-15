export type MenuItem = { name: string; description?: string; priceDZD: number };
export type MenuCategory = { id: string; name: string; description: string; items: MenuItem[] };
/** Categories supported by the official profile. Add only owner-approved dishes and prices.
 * Empty items arrays intentionally show no dishes, prices, or demo data to visitors.
 */
export const menu: MenuCategory[] = [
 {id:'cafe',name:'Café & boissons',description:'Un café, une conversation, une pause dans la journée. Installez-vous et prenez le temps.',items:[]},
 {id:'brunch',name:'Brunch',description:'Pour se retrouver autour de la table, dès le début de la journée.',items:[]},
 {id:'restaurant',name:'Restaurant',description:'Pour le déjeuner ou le dîner, découvrez la carte et les grillades de Rahoui sur place.',items:[]},
 {id:'douceurs',name:'Pâtisserie',description:'Pâtisseries individuelles et gâteaux : faites votre choix devant la vitrine.',items:[]},
];
