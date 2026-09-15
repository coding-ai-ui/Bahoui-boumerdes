import { business } from './config/business';

type ReservationChannel = { type: 'phone'; destination: string } | { type: 'whatsapp'; destination: string } | { type: 'email'; destination: string };

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const algeriaToday = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Algiers',year:'numeric',month:'2-digit',day:'2-digit' }).format(new Date());

/** Contact handoff: a request is confirmed only by the restaurant, never by this form.
 * Do not configure a WhatsApp number without verifying that it belongs to Rahoui and accepts messages.
 * No personal data is saved in browser storage, URLs on this site, or analytics.
 */
export function setupReservations(channel?: ReservationChannel) {
 const dialog = document.createElement('dialog');
 dialog.className = 'reservation-dialog';
 dialog.id = 'reservation-dialog';
 dialog.setAttribute('aria-labelledby','reservation-title');
 dialog.innerHTML = `<div class="reservation-top"><p class="eyebrow">À LA TABLE DE RAHOUI</p><button type="button" class="reservation-close" aria-label="Fermer la réservation">Fermer ×</button></div>
 <div class="reservation-intro"><h2 id="reservation-title">On vous garde<br><em>une place ?</em></h2><p>Préparez votre venue, puis appelez Rahoui.<br>Notre équipe vous confirmera la disponibilité.</p></div>
 <form id="reservation-form"><div class="reservation-fields">
  <label>Date souhaitée<input type="date" name="date" required min="${algeriaToday()}" aria-describedby="reservation-note" /></label>
  <label>Heure souhaitée<input type="time" name="time" required aria-describedby="reservation-note" /></label>
  <label>Nombre de personnes<input type="number" name="guests" required min="1" step="1" value="2" inputmode="numeric" /></label>
  <label>Votre nom<input name="name" type="text" autocomplete="name" required maxlength="100" placeholder="Prénom et nom" /></label>
  <label class="field-wide">Votre téléphone<input name="phone" type="tel" autocomplete="tel" required maxlength="30" placeholder="Numéro auquel vous joindre" /></label>
  <label class="field-wide">Une précision ? <span class="optional">Facultatif</span><textarea name="notes" rows="2" maxlength="500" placeholder="Une occasion particulière, une préférence de placement…"></textarea></label>
 </div><p id="reservation-note" class="reservation-notice">Il s’agit d’une demande. Votre réservation sera confirmée directement par l’équipe de Rahoui, selon les disponibilités et les horaires du restaurant.</p>
 <p class="reservation-error" role="alert"></p>
 <button class="button button-dark reservation-submit" type="submit">Préparer mon appel <span aria-hidden="true">→</span></button>
 <p class="reservation-privacy">Aucune demande n’est envoyée par ce formulaire. Communiquez ces informations à Rahoui pendant votre appel.</p></form>
 <section class="reservation-review" hidden aria-labelledby="review-title"><h3 id="review-title">Votre demande</h3><dl></dl><p class="reservation-review-note"></p><a class="button button-dark reservation-send"></a><button type="button" class="reservation-edit">Modifier ma demande</button><p class="reservation-notice">Votre table sera réservée après confirmation de l’équipe de Rahoui pendant l’appel.</p></section>`;
 document.body.append(dialog);
 const form = dialog.querySelector<HTMLFormElement>('form')!;
 const review = dialog.querySelector<HTMLElement>('.reservation-review')!;
 const error = dialog.querySelector<HTMLElement>('.reservation-error')!;
 const dateInput = form.elements.namedItem('date') as HTMLInputElement;
 document.querySelectorAll<HTMLElement>('[data-reserve]').forEach(button=>button.addEventListener('click',()=>{
  dateInput.min = algeriaToday();
  dialog.showModal(); document.body.classList.add('modal-open');
 }));
 dialog.querySelector('.reservation-close')!.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
 dialog.addEventListener('click',e=>{if(e.target===dialog) {const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
 form.addEventListener('submit',event=>{
  event.preventDefault(); error.textContent='';
  if(!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  const phone = String(data.get('phone')).trim();
  const date = String(data.get('date'));
  const time = String(data.get('time'));
  const guests = Number(data.get('guests'));
  const notes = String(data.get('notes')).trim();
  if(!name || phone.replace(/\D/g,'').length<7 || !Number.isSafeInteger(guests) || guests<1){error.textContent='Vérifiez votre nom, votre numéro de téléphone et le nombre de personnes.';return;}
  if(new Date(`${date}T${time}:00+01:00`).getTime()<=Date.now()){error.textContent='Choisissez une date et une heure à venir.';return;}
  if(!channel){error.textContent='Le service de réservation est en cours de configuration. Aucune demande n’a été envoyée.';return;}
  const formattedDate = new Intl.DateTimeFormat('fr-DZ',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'Africa/Algiers'}).format(new Date(`${date}T12:00:00+01:00`));
  const message = `Bonjour Rahoui, je souhaite réserver une table.\n\nNom : ${name}\nDate : ${formattedDate}\nHeure souhaitée : ${time}\nPersonnes : ${guests}\nTéléphone : ${phone}${notes?`\nPrécision : ${notes}`:''}\n\nMerci de me confirmer la disponibilité.`;
  const rows = [['Date',formattedDate],['Heure souhaitée',time],['Personnes',String(guests)],['Nom',name],['Téléphone',phone],...(notes?[['Précision',notes]]:[])];
  review.querySelector('dl')!.innerHTML=rows.map(([key,value])=>`<div><dt>${key}</dt><dd>${escapeHtml(value)}</dd></div>`).join('');
  const send = review.querySelector<HTMLAnchorElement>('.reservation-send')!;
  if(channel.type==='phone'){
   send.href=`tel:${channel.destination}`;
   send.textContent=`Appeler le ${business.phoneDisplay}`;
   review.querySelector('.reservation-review-note')!.textContent='Gardez ces détails sous les yeux et communiquez-les à Rahoui pendant votre appel. L’équipe vous indiquera si une table est disponible.';
  }else{
   const service = channel.type==='whatsapp'?'WhatsApp':'votre application e-mail';
   send.href = channel.type==='whatsapp'?`https://wa.me/${channel.destination.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`:`mailto:${channel.destination}?subject=${encodeURIComponent(`Demande de réservation — ${business.name}`)}&body=${encodeURIComponent(message)}`;
   send.textContent = channel.type==='whatsapp'?'Continuer sur WhatsApp ↗':'Ouvrir mon e-mail ↗';
   send.target='_blank';send.rel='noopener noreferrer';
   review.querySelector('.reservation-review-note')!.textContent=`Votre message est prêt. Envoyez-le à Rahoui dans ${service} pour demander votre table.`;
  }
  form.hidden=true;review.hidden=false;send.focus();
 });
 dialog.querySelector('.reservation-edit')!.addEventListener('click',()=>{review.hidden=true;form.hidden=false;dateInput.focus()});
}
