const labels = document.querySelectorAll('.label');
const hideUnder768 = document.querySelectorAll('.hideUnder768');

function addHiddenClass(el) {
  el.classList.add('hidden');
}
function removeHiddenClass(el) {
  el.classList.remove('hidden');
}

function checkScreenSize() {
  if (window.matchMedia('(max-width: 768px)').matches) {
    // under 768px
    labels.forEach(label => label.classList.add('hidden'));
    console.log("hiding labels");
  } else {
    // 768px and above
    labels.forEach(label => label.classList.remove('hidden'));
    console.log("showing labels");
  }
}


document.addEventListener('DOMContentLoaded', checkScreenSize);
window.addEventListener('resize', checkScreenSize);


function filterCards(category) {
  allCards.forEach(addHiddenClass);

  if (category === 'all') {
    allCards.forEach(removeHiddenClass);
    return;
  }

  const categoryMap = {
    study: 'studyCard',
    streak: 'streakCard',
    social: 'socialCard',
    mastery: 'masteryCard'
  };

  const cardClass = categoryMap[category];
  if (!cardClass) return;

  allCards.forEach(card => {
    if (card.classList.contains(cardClass)) {
      removeHiddenClass(card);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.achievementFilter');

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filterButton');
    if (!btn) return;

    container.querySelectorAll('.filterButton').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.textContent.trim().toLowerCase();
    filterCards(category);
  });
});

window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);
