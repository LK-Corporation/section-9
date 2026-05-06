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

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', bindClickableCards);
} else {
  bindClickableCards();
}
