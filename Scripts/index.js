const labels = document.querySelectorAll('.label');
const hideUnder768 = document.querySelectorAll('.hideUnder768');
const allCards = document.querySelectorAll('.achievementCard');

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

// ...existing code...
// create the dropdown logic for the dropdown menu in the community page
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const options = dropdownContent.querySelectorAll('.filter-option');

        // toggle dropdown open/close
        dropbtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });

        // clicking an option: set active, update check icons and update button label
        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // clear previous active & hide their check icons
                options.forEach(o => {
                    o.classList.remove('active');
                    const c = o.querySelector('.check-icon');
                    if (c) c.classList.add('hidden');
                });

                // mark clicked as active and show its check icon
                opt.classList.add('active');
                const check = opt.querySelector('.check-icon');
                if (check) check.classList.remove('hidden');

                // update the dropbtn to display the active filter while keeping the filter icon
                const label = opt.textContent.replace(check ? check.textContent.trim() : '', '').trim();
                const currentIcon = dropbtn.querySelector('.filter-icon').outerHTML;
                dropbtn.innerHTML = currentIcon + ' ' + label;

                // close dropdown
                dropdown.classList.remove('open');
            });
        });

        // Close the dropdown if the user clicks outside of it
        window.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
    });

});