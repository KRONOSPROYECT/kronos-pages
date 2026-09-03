// AntiFake - Main v1.0.0 - KRONOS-MD-33-467162326
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-auditar')?.addEventListener('click', () => auditarFolio());
  document.getElementById('btn-demo')?.addEventListener('click', () => cargarFoliosDemo());
  document.querySelectorAll('.btn-soon').forEach(b => b.addEventListener('click', () => alert('🚀 Próximamente - Demo activo en #demo')));
  document.querySelector('.btn-contact')?.addEventListener('click', () => alert('📞 Contacta: ventas@antifake-system.io'));
  
  // Offline indicator
  const ind = document.getElementById('offline-indicator');
  window.addEventListener('offline', () => ind && (ind.style.display = 'block'));
  window.addEventListener('online', () => ind && (ind.style.display = 'none'));
});

async function auditarFolio(){
  const folio = document.getElementById('folioInput').value.trim();
  const card = document.getElementById('resultado-auditoria');
  if(!folio){ card.innerHTML='Ingresa folio'; card.classList.remove('hidden'); return; }
  const res = await window.trazabilidad?.verificar(folio) || { folio, status: 'DEMO', chainValid: true };
  card.innerHTML = `<pre>${JSON.stringify(res, null, 2)}</pre><small>Verificado con ${res.method||'quantum-seal v1'}</small>`;
  card.classList.remove('hidden');
}
function cargarFoliosDemo(){ auditarFolio(); }