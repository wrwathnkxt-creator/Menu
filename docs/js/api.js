// ============================================================
// api.js — SmartKitchen API Wrapper
// fetch helper สำหรับเรียก Google Apps Script Web App
// ============================================================

const API = {

  // ── GET Request ──────────────────────────────────────────
  async get(action, params = {}) {
    const url = new URL(CONFIG.GAS_URL);
    url.searchParams.set('action', action);
    for (const [key, val] of Object.entries(params)) {
      url.searchParams.set(key, val);
    }

    try {
      const res  = await fetch(url.toString());
      const json = await res.json();
      return json;
    } catch (err) {
      return { success: false, error: { code: 'NETWORK_ERROR', message: err.message } };
    }
  },

  // ── POST Request ─────────────────────────────────────────
  async post(action, body = {}) {
    const url = CONFIG.GAS_URL + '?action=' + action;
    try {
      const res  = await fetch(url, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body)
      });
      const json = await res.json();
      return json;
    } catch (err) {
      return { success: false, error: { code: 'NETWORK_ERROR', message: err.message } };
    }
  },

  // ── Convenience Methods ───────────────────────────────────
  getMenu()                          { return this.get('getMenu'); },
  getOrders(status = 'all')          { return this.get('getOrders', { status }); },
  getStats()                         { return this.get('getStats'); },
  login(email, password)             { return this.get('login', { email, password }); },
  validatePromo(code)                { return this.get('validatePromo', { code }); },

  createOrder(data)                  { return this.post('createOrder', data); },
  updateStatus(order_id, status)     { return this.post('updateStatus', { order_id, status }); },
  addMenu(data)                      { return this.post('addMenu', data); },
  updateStock(id, stock)             { return this.post('updateStock', { id, stock }); },
  toggleAvailable(id, available)     { return this.post('toggleAvailable', { id, available }); }
};
