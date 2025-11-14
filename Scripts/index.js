const navbarListItems = document.querySelectorAll('.navbar-list-item p');
function checkScreenSize() {
    const targetWidth = 768;
    const body = document.body;

    if (window.innerWidth < targetWidth) {
      for (const item of navbarListItems) {
        addHiddenClass(item);
      }
    } else {
      for (const item of navbarListItems) {
        removeHiddenClass(item);
      }
    }
}

function addHiddenClass(element) {
    element.classList.add('hidden');
}

function removeHiddenClass(element) {
    element.classList.remove('hidden');
}

window.addEventListener('resize', checkScreenSize);