const labels = document.querySelectorAll('.label');
const hideUnder768 = document.querySelectorAll('.hideUnder768');

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
    hideUnder768.forEach(i => removeHiddenClass(i));
  } else {
    // show labels
    labels.forEach(l => removeHiddenClass(l));

    // hide icons
    hideUnder768.forEach(i => addHiddenClass(i));
  }
}

window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);
