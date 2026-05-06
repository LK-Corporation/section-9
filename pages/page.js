/* Section 9 // Sub-page interactions
 * Click on any .dossier-item or .angel-card → opens it in a fullscreen modal.
 * Esc or click outside closes.
 */

function getCardColorClass(el){
  if (el.classList.contains('cyan')) return 'cyan';
  if (el.classList.contains('orange')) return 'orange';
  return '';
}

function openItemModal(itemEl){
  closeItemModal();
  const cls = getCardColorClass(itemEl);
  const modal = document.createElement('div');
  modal.className = 'page-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `
    <div class="page-modal-card ${cls}">
      <button class="page-modal-close" aria-label="Close">[ESC] CLOSE</button>
      ${itemEl.innerHTML}
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeItemModal();
  });
  modal.querySelector('.page-modal-close').addEventListener('click', closeItemModal);
  // Focus management — move focus into modal for keyboard users
  const closeBtn = modal.querySelector('.page-modal-close');
  closeBtn && closeBtn.focus();
  // Prevent background scroll
  document.body.style.overflow = 'hidden';
}

function closeItemModal(){
  document.querySelectorAll('.page-modal').forEach(m => m.remove());
  document.body.style.overflow = '';
}

function bindClickableCards(){
  document.querySelectorAll('.dossier-item, .angel-card').forEach((item) => {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.addEventListener('click', () => openItemModal(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openItemModal(item);
      }
    });
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.querySelector('.page-modal')){
    closeItemModal();
  }
});

/* ===== Defterm tooltips =====
 * Any <span class="defterm" data-def="..."> shows a hover tooltip after a small
 * delay. Works for both pointer and touch (tap toggles).
 */
let _defTooltip = null;
let _defTimer = null;

function showDefTooltip(el, x, y){
  hideDefTooltip();
  const def = el.getAttribute('data-def');
  if (!def) return;
  const tt = document.createElement('div');
  tt.className = 'def-tooltip';
  tt.setAttribute('role', 'tooltip');
  tt.innerHTML = '<div class="def-tooltip-term">' + el.textContent + '</div>' +
                 '<div class="def-tooltip-body">' + def + '</div>';
  document.body.appendChild(tt);
  positionDefTooltip(tt, x, y);
  requestAnimationFrame(() => tt.classList.add('show'));
  _defTooltip = tt;
}

function positionDefTooltip(tt, x, y){
  const offX = 14, offY = 14, pad = 10;
  let left = x + offX;
  let top = y + offY;
  const r = tt.getBoundingClientRect();
  if (left + r.width > window.innerWidth - pad) left = Math.max(pad, x - r.width - offX);
  if (top + r.height > window.innerHeight - pad) top = Math.max(pad, y - r.height - offY);
  tt.style.left = left + 'px';
  tt.style.top = top + 'px';
}

function hideDefTooltip(){
  document.querySelectorAll('.def-tooltip').forEach(el => el.remove());
  _defTooltip = null;
  if (_defTimer){ clearTimeout(_defTimer); _defTimer = null; }
}

function bindDefterms(){
  document.querySelectorAll('.defterm[data-def]').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      if (_defTimer) clearTimeout(_defTimer);
      const x = e.clientX, y = e.clientY;
      _defTimer = setTimeout(() => showDefTooltip(el, x, y), 600);
    });
    el.addEventListener('mousemove', (e) => {
      if (_defTooltip) positionDefTooltip(_defTooltip, e.clientX, e.clientY);
    });
    el.addEventListener('mouseleave', hideDefTooltip);
    el.addEventListener('click', (e) => {
      // touch / click: toggle
      e.stopPropagation();
      if (_defTooltip) hideDefTooltip();
      else {
        const r = el.getBoundingClientRect();
        showDefTooltip(el, r.left + r.width / 2, r.bottom);
      }
    });
  });
  // dismiss tooltip on outside click / scroll
  document.addEventListener('click', () => hideDefTooltip());
  document.addEventListener('scroll', () => hideDefTooltip(), true);
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', () => { bindClickableCards(); bindDefterms(); });
} else {
  bindClickableCards();
  bindDefterms();
}
