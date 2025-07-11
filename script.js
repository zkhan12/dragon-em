let phrases = [];
let fuse;

const searchInput = document.getElementById('search');
const groupFilter = document.getElementById('chiefComplaintFilter');
const resultsDiv = document.getElementById('results');
const agreementModal = document.getElementById('agreementModal');
const agreeBtn = document.getElementById('agreeBtn');

const wikemFiles = [
  'ros.json',
  'ama.json',
  'observation.json',
  'critical_care.json',
  'mdm.json',
  'reexamination.json',
  'procedure.json',
  'differential_diagnosis.json',
  'physical_exam.json'
];

function normalize(str) {
  return (str || '').toLowerCase().trim();
}

// Check if user has already agreed
function hasUserAgreed() {
  return localStorage.getItem('dragonEMAgreed') === 'true';
}

// Mark user as agreed
function markUserAgreed() {
  localStorage.setItem('dragonEMAgreed', 'true');
}

// Show modal if user hasn't agreed
function showAgreementModal() {
  if (!hasUserAgreed()) {
    agreementModal.classList.remove('hidden');
    // Disable scrolling on body
    document.body.style.overflow = 'hidden';
  }
}

// Hide modal and enable site
function hideAgreementModal() {
  agreementModal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  markUserAgreed();
}

async function loadAllPhrases() {
  const all = [];
  for (const file of wikemFiles) {
    try {
      const res = await fetch(`resources/wikem/${file}`);
      if (!res.ok) continue;
      const data = await res.json();
      all.push(...data);
    } catch (e) {
      // skip file if error
    }
  }
  return all;
}

function setupFilters() {
  // Populate group filter
  const groups = Array.from(new Set(phrases.map(p => normalize(p.group))));
  groups.sort();
  groups.forEach(g => {
    const option = document.createElement('option');
    option.value = g;
    option.textContent = g;
    groupFilter.appendChild(option);
  });
}

function setupFuse() {
  fuse = new Fuse(phrases, {
    keys: ['name', 'group', 'tags', 'note'],
    threshold: 0.3,
    ignoreLocation: true
  });
}

function filterAndSearch() {
  let results = phrases;
  const group = normalize(groupFilter.value);
  const search = searchInput.value.trim();

  if (group) {
    results = results.filter(p => normalize(p.group) === group);
  }
  if (search) {
    results = fuse.search(search).map(r => r.item).filter(p => results.includes(p));
  }
  renderResults(results);
}

function renderResults(list) {
  if (!list.length) {
    resultsDiv.innerHTML = '<p>No phrases found.</p>';
    return;
  }
  resultsDiv.innerHTML = list.map((p, idx) => `
    <div class="phrase-item">
      <button class="copy-btn" data-idx="${idx}" title="Copy phrase" aria-label="Copy phrase">
        <svg viewBox="0 0 20 20" fill="none"><rect x="6" y="6" width="9" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="3" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        <span class="copy-btn-text">Copy</span>
      </button>
      <div class="phrase-meta"><strong>${p.name}</strong> &mdash; ${p.group} &mdash; ${p.tags && p.tags[0] ? p.tags[0] : ''}</div>
      <div class="phrase-text">${p.note}</div>
    </div>
  `).join('');

  // Add copy event listeners
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.getAttribute('data-idx');
      const phrase = list[idx].note;
      navigator.clipboard.writeText(phrase).then(() => {
        this.classList.add('copied');
        this.querySelector('.copy-btn-text').textContent = 'Copied!';
        setTimeout(() => {
          this.classList.remove('copied');
          this.querySelector('.copy-btn-text').textContent = 'Copy';
        }, 1200);
      });
    });
  });
}

// Event listeners
searchInput.addEventListener('input', filterAndSearch);
groupFilter.addEventListener('change', filterAndSearch);
agreeBtn.addEventListener('click', hideAgreementModal);

// Main init
(async function() {
  // Show agreement modal first
  showAgreementModal();
  
  // Load phrases and setup site
  phrases = await loadAllPhrases();
  setupFilters();
  setupFuse();
  renderResults(phrases);
})(); 