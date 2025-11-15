const labels = document.querySelectorAll('.navbar-list-item .label');
const authIcons = document.querySelectorAll('.authIcon');

function addHiddenClass(el) {
  el.classList.add('hidden');
}
function removeHiddenClass(el) {
  el.classList.remove('hidden');
}

function checkScreenSize() {
  const targetWidth = 768;

  if (window.innerWidth < targetWidth) {
    // hide labels only
    labels.forEach(l => addHiddenClass(l));

    // show icons only
    authIcons.forEach(i => removeHiddenClass(i));
  } else {
    // show labels
    labels.forEach(l => removeHiddenClass(l));

    // hide icons
    authIcons.forEach(i => addHiddenClass(i));
  }
}

window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);
