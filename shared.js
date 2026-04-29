// ============================================================
// shared.js — Faith Lock & Safe Job Management System
//
// Utilities shared by admin.html, tech.html, accounts.html, and index.html.
// Load order in every HTML file:
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
//   <script src="shared.js"></script>
//   <script> /* page-specific code here */ </script>
// ============================================================


// ---- SUPABASE CONNECTION ----
const SUPABASE_URL      = 'https://jmsrlhqbzstuczxilxua.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptc3JsaHFienN0dWN6eGlseHVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MzA5NDcsImV4cCI6MjA5MjQwNjk0N30.jpHtuhezvfRXJ2uVhwglqS_rImZl8JqqBX85WUv2Z5g';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// ---- BRAND COLORS ----
// Derived from Faith Lock & Safe logo.
// Navy (#1a2744) = primary dark. Purple (#6b6fa8) = accent. White = surface.
// Use these constants anywhere inline color is needed outside CSS.
const BRAND = {
  navy:   '#1a2744',
  purple: '#6b6fa8',
  green:  '#2a7a4a',
  red:    '#a02020',
  amber:  '#b86c00',
  bg:     '#f2f4f8',
};


// ---- DATE HELPERS ----

// formatDate: converts a Postgres date string (YYYY-MM-DD) to MM/DD/YYYY.
// Splits on '-' to avoid UTC-midnight timezone shift bugs from new Date().
function formatDate(str) {
  if (!str) return '';
  const [y, m, d] = str.split('-');
  return `${m}/${d}/${y}`;
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

// weekStart: returns most recent Monday as YYYY-MM-DD.
function weekStart() {
  const d = new Date();
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.toISOString().split('T')[0];
}

// nowLocal: returns current local datetime as YYYY-MM-DDTHH:MM for datetime-local inputs.
function nowLocal() {
  const d = new Date();
  return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}


// ---- SELECT HELPERS ----

function populateSelect(id, items, valueKey, labelKey, placeholder) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `<option value="">${placeholder}</option>` +
    items.map(i => `<option value="${i[valueKey]}">${i[labelKey]}</option>`).join('');
}

function populateMultiSelect(id, items, valueKey, labelKey) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = items.map(i => `<option value="${i[valueKey]}">${i[labelKey]}</option>`).join('');
}


// ---- REVENUE CALCULATION ----

function calcRevenue(lineItems) {
  return (lineItems || []).reduce(
    (sum, i) => sum + ((i.override_cost ?? i.unit_cost) * i.quantity), 0
  );
}


// ---- IMAGE RESIZE ----

function resizeImage(file, maxW) {
  return new Promise(resolve => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxW / img.width);
      const canvas = document.createElement('canvas');
      canvas.width  = img.width  * scale;
      canvas.height = img.height * scale;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.85);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}


// ---- CSV EXPORT ----

function downloadCSV(rows, filename) {
  const csv  = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `${filename}.csv`; a.click();
  URL.revokeObjectURL(url);
}


// ---- PHOTO GRID ----

async function fetchPhotoUrls(photos) {
  return Promise.all(photos.map(async p => {
    const { data: signed, error } = await db.storage
      .from('job-photos')
      .createSignedUrl(p.storage_path, 7200);
    if (signed?.signedUrl) return { ...p, url: signed.signedUrl };
    // Log the error so it is visible in the browser console for debugging.
    if (error) console.warn('fetchPhotoUrls: signed URL failed for', p.storage_path, error.message);
    return { ...p, url: null };
  }));
}

function renderPhotoGrid(gridEl, withUrls, showDate = true) {
  if (!withUrls.length) {
    gridEl.innerHTML = '<span style="font-size:0.82rem;color:#aaa">No photos yet.</span>';
    return;
  }
  gridEl.innerHTML =
    '<div style="display:flex;flex-wrap:wrap;gap:0.6rem">' +
    withUrls.map(p => {
      const safeName = (p.file_name || 'photo').replace(/"/g, '&quot;');
      const label    = p.file_name || 'photo';
      const dateHtml = (showDate && p.uploaded_at)
        ? `<div style="font-size:0.72rem;color:#888">${new Date(p.uploaded_at).toLocaleDateString('en-US')}</div>`
        : '';
      if (p.url) {
        return `<div style="text-align:center">
          <a href="${p.url}" target="_blank">
            <img src="${p.url}"
              style="width:110px;height:88px;object-fit:cover;border:1px solid #ccc;border-radius:3px;display:block;cursor:pointer"
              data-name="${safeName}"
              onerror="this.parentElement.innerHTML='<div style=&quot;width:110px;height:88px;background:#eee;border:1px solid #ccc;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.75rem;padding:4px&quot;>'+this.dataset.name+'</div>'">
          </a>
          <div style="font-size:0.72rem;max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:3px">
            <a href="${p.url}" target="_blank" style="color:#1a2744">${label}</a>
          </div>
          ${dateHtml}
        </div>`;
      } else {
        return `<div style="text-align:center">
          <div style="width:110px;height:88px;background:#eee;border:1px solid #ccc;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.75rem;padding:4px">${label}</div>
          <div style="font-size:0.72rem;max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:3px">${label}</div>
          ${dateHtml}
        </div>`;
      }
    }).join('') + '</div>';
}


// ---- MAPS LINK ----

function mapsLink(address) {
  if (!address) return '';
  return `<a href="https://maps.google.com/?q=${encodeURIComponent(address)}" target="_blank"
    style="color:#1a2744;text-decoration:underline">${address} &#8599;</a>`;
}


// ---- SIGN OUT ----

async function logout() {
  await db.auth.signOut();
  window.location.href = 'index.html';
}
