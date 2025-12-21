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

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.profileNav');

  if (container) {
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.profileNavListItem');
      if (!btn) return;

      container.querySelectorAll('.profileNavListItem').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const label = btn.querySelector('.profileNavListItemLabel');
      const category = label ? label.textContent.trim().toLowerCase() : btn.textContent.trim().toLowerCase();
      filterProfile(category);
    });
  }
});

function filterProfile(category) {
  
  const categoryMap = {
    'overview': 'overviewSection',
    'achievements': 'achievementsSection',
    'social': 'friendsSection',
    'settings': 'settingsSection'
  };

  const targetClass = categoryMap[category];
  if (!targetClass) {
    console.log('No target class found for:', category);
    return;
  }

  // Hide all sections
  const sections = ['overviewSection', 'achievementsSection', 'friendsSection', 'settingsSection'];
  sections.forEach(section => {
    const el = document.querySelector('.' + section);
    if (el) el.classList.add('hidden');
  });

  // Show the target section
  const targetSection = document.querySelector('.' + targetClass);
  if (targetSection) targetSection.classList.remove('hidden');
}

window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);

// ...existing code...
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

    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        options.forEach(o => {
          o.classList.remove('active');
          const c = o.querySelector('.check-icon');
          if (c) c.classList.add('hidden');
        });

        opt.classList.add('active');
        const check = opt.querySelector('.check-icon');
        if (check) check.classList.remove('hidden');

        const label = opt.textContent.replace(check ? check.textContent.trim() : '', '').trim();
        const currentIcon = dropbtn.querySelector('.filter-icon').outerHTML;
        dropbtn.innerHTML = currentIcon + ' ' + label;

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

const friendTemplate = `
<div class="friendInfo">
  <div class="friendProfilePicContainer">                              
    <i class="material-symbols-outlined friendProfilePicIcon">person</i>
  </div>
  <p class="friendScreenname">Friend Username</p>
</div>
<div class="friendStreak">
    <i class="material-symbols-outlined">mode_heat</i>
    <p class="friendStreakCount">0</p>
</div>                                
`;

let friends = [
  {
    username: "Alice",
    icon: "person",
    streak: 5
  },
  {
    username: "Bob",
    icon: "person",
    streak: 12
  },
  {
    username: "Charlie",
    icon: "heat",
    streak: 3
  }
];

let friendTemplateObject = {
  username: "Friend Username",
  streak: 0
};
function renderFriends() {
  const container = document.querySelector('.friendsList');
  if (!container) return;
  container.innerHTML = '';
  friends.forEach(fr => {
    const frEl = document.createElement('div');
    frEl.classList.add('friendItem');
    frEl.innerHTML = friendTemplate;
    frEl.querySelector('.friendScreenname').textContent = fr.username;
    frEl.querySelector('.friendProfilePicIcon').textContent = fr.icon;
    frEl.querySelector('.friendStreakCount').textContent = fr.streak;
    container.appendChild(frEl);
  });
}

document.addEventListener('DOMContentLoaded', renderFriends);

const avatarChangeTemplate = `
    <i class="material-symbols-outlined avatarOptionIcon"></i>
`;

let avatarChangeOptions = [
  { icon: "person",},
  { icon: "face",},
  { icon: "pets",},
  { icon: "sports_basketball",},
  { icon: "sports_esports", },
  { icon: "music_note", },
  { icon: "brush", },
  { icon: "fitness_center", },
  { icon: "directions_bike", },
  { icon: "local_cafe", },
  { icon: "emoji_events", },
  { icon: "public", }
];

function renderAvatarOptions() {
  const container = document.querySelector('.avatarOptionsContainer');
  if (!container) return;
  container.innerHTML = '';
  avatarChangeOptions.forEach(option => {
    const optionEl = document.createElement('button');
    optionEl.classList.add('avatarOptionItem');
    optionEl.innerHTML = avatarChangeTemplate;
    optionEl.querySelector('.avatarOptionIcon').textContent = option.icon;
    container.appendChild(optionEl);
  });
}

document.addEventListener('DOMContentLoaded', renderAvatarOptions);

const bgColorChangeTemplate = `
    <div class="bgColorOptionCircle"></div>
`;

let bgColorChangeOptions = [
  { color: "#FF5733" },
  { color: "#33FF57" },
  { color: "#3357FF" },
  { color: "#F1C40F" },
  { color: "#9B59B6" },
  { color: "#E67E22" },
  { color: "#1ABC9C" },
  { color: "#2C3E50" }
];

function renderBgColorOptions() {
  const container = document.querySelector('.backgroundColorOptionsContainer');
  if (!container) return;
  container.innerHTML = '';
  bgColorChangeOptions.forEach(option => {
    const optionEl = document.createElement('button');
    optionEl.classList.add('bgColorOptionItem');
    optionEl.innerHTML = bgColorChangeTemplate;
    optionEl.querySelector('.bgColorOptionCircle').style.backgroundColor = option.color;
    container.appendChild(optionEl);
  });
}

document.addEventListener('DOMContentLoaded', renderBgColorOptions);

const borderStyleChangeTemplate = `
    <div class="borderStyleOptionPreview"></div>
`;
let borderStyleChangeOptions = [
  {
    border: "2px solid #FF5733"
  },
  {
    border: "2px solid #33FF57"
  },
  {    
    border: "2px solid #3357FF"
  },
  {
    border: "2px solid #F1C40F"
  },
  {    
    border: "2px solid #9B59B6"
  },
  {    
    border: "2px solid #E67E22"
  },
  {    
    border: "2px solid #1ABC9C"
  },
  {    
    border: "2px solid #2C3E50"
  }
];

function renderBorderStyleOptions() {
  const container = document.querySelector('.borderStyleOptionsContainer');
  if (!container) return;
  container.innerHTML = ''; 
  borderStyleChangeOptions.forEach(option => {
    const optionEl = document.createElement('button');
    optionEl.classList.add('borderStyleOptionItem');
    optionEl.innerHTML = borderStyleChangeTemplate;
    optionEl.querySelector('.borderStyleOptionPreview').style.border = option.border;
    container.appendChild(optionEl);
  });
}

document.addEventListener('DOMContentLoaded', renderBorderStyleOptions);

document.addEventListener('DOMContentLoaded', () => {
  const customizeMenu = document.querySelector(".customizeProfileMenu");
  const customizeContainer = document.querySelector(".customizeProfileMenuContainer");
  const profilePictureContainer = document.querySelector(".profilePictureContainer");
  const editBtn = document.getElementById('userInfoEditBtn');
  const customizeAvatarBtn = document.querySelector('.customizeAvatarBtn');
  const avatarIcon = document.querySelector('.profilePicIcon');

  // Only run if customize menu exists (profile page)
  if (!customizeMenu) return;

  // Show menu when profile picture or edit button clicked
  if (profilePictureContainer) {
    profilePictureContainer.addEventListener("click", () => {
      customizeMenu.classList.remove("hidden");
    });
    profilePictureContainer.addEventListener("mouseover", () => {
      customizeAvatarBtn.classList.remove("hidden");
      avatarIcon.classList.add("hidden");
    });
    profilePictureContainer.addEventListener("mouseout", () => {
      customizeAvatarBtn.classList.add("hidden");
      avatarIcon.classList.remove("hidden");
    });
  }

  // Clicking outside container hides menu
  customizeMenu.addEventListener('click', (e) => {
    if (e.target === customizeMenu) {
      customizeMenu.classList.add('hidden');
    }
  });

  // Clicking inside container doesn't close it
  customizeContainer.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

const settingsTemplate = `
<span class="settingsItemInfo">
  <i class="material-symbols-outlined">notifications</i>
  <div class="settingsItemInfoText">
    <p class="settingsItemLabel">Notifications</p>
    <p class="settingsItemDesc">Enable or disable notifications</p>
  </div>
</span>
<label class="settingsItemToggle">
  <input type="checkbox" id="notificationsToggle" checked>
  <span class="toggleCircle"></span>
</label>                              
`;

let settingsItems = [
  {
    label: "Notifications",
    description: "Enable or disable notifications",
    icon: "notifications",
    enabled: true
  },
  {
    label: "Dark Mode",
    description: "Switch between light and dark themes",
    icon: "dark_mode",
    enabled: false
  },
  {
    label: "Privacy Settings",
    description: "Manage your privacy preferences",
    icon: "privacy_tip",
    enabled: true
  }
];

function renderSettingsItems() {
  const container = document.querySelector('.settingsList');
  if (!container) return;
  container.innerHTML = '';
  settingsItems.forEach(item => {
    const itemEl = document.createElement('li');
    itemEl.classList.add('settingsItem');
    itemEl.innerHTML = settingsTemplate;
    itemEl.querySelector('.settingsItemLabel').textContent = item.label;
    itemEl.querySelector('.settingsItemDesc').textContent = item.description;
    itemEl.querySelector('.settingsItemInfo i').textContent = item.icon;
    const toggle = itemEl.querySelector('.settingsItemToggle input');
    toggle.checked = item.enabled;
    container.appendChild(itemEl);
  });
}

document.addEventListener('DOMContentLoaded', renderSettingsItems);
