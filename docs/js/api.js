const API = {
  getHeaders() {
    return {
      'apikey': CONFIG.SUPABASE_KEY,
      'Authorization': `Bearer ${CONFIG.SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    };
  },
  async login(email, password) {
    try {
      const res = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email)}&password=eq.${encodeURIComponent(password)}&select=*`, { headers: this.getHeaders() });
      const data = await res.json();
      if (data && data.length > 0) return { success: true, data: data[0] };
      return { success: false, error: { message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' } };
    } catch (err) { return { success: false, error: { message: err.message } }; }
  },
  async getMenu() {
    try {
      const res = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/menu?select=*&order=category.asc,name.asc`, { headers: this.getHeaders() });
      const data = await res.json();
      return { success: true, data: data };
    } catch (err) { return { success: false, error: { message: err.message } }; }
  },
  async getOrders(statusFilter = 'all') {
    try {
      let url = `${CONFIG.SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc`;
      if (statusFilter !== 'all') url += `&status=eq.${statusFilter}`;
      const res = await fetch(url, { headers: this.getHeaders() });
      const data = await res.json();
      return { success: true, data: data };
    } catch (err) { return { success: false, error: { message: err.message } }; }
  },
  async getStats() {
    try {
      const res = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/orders?select=*`, { headers: this.getHeaders() });
      const data = await res.json();
      let total_orders = 0, total_revenue = 0, active_queue = 0;
      data.forEach(order => {
        total_orders++;
        total_revenue += Number(order.total);
        if (order.status === 'pending' || order.status === 'cooking') active_queue++;
      });
      return { success: true, data: { total_orders, total_revenue, active_queue } };
    } catch (err) { return { success: false, error: { message: err.message } }; }
  },
  async createOrder(data) {
    try {
      for (const item of data.items) {
        const mRes = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/menu?id=eq.${item.id}&select=stock`, { headers: this.getHeaders() });
        const mData = await mRes.json();
        if (mData && mData.length > 0) {
           await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/menu?id=eq.${item.id}`, { method: 'PATCH', headers: this.getHeaders(), body: JSON.stringify({ stock: mData[0].stock - item.qty }) });
        }
      }
      const res = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/orders`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ order_id: 'ORD-' + Math.floor(1000 + Math.random() * 9000), customer_name: data.customer_name, phone: data.phone, address: data.address, items: data.items, subtotal: data.subtotal, delivery_fee: data.delivery_fee || 0, discount: data.discount || 0, total: data.total, status: 'pending' })
      });
      return { success: res.ok, data: { order_id: 'success' } };
    } catch (err) { return { success: false, error: { message: err.message } }; }
  },
  async updateStatus(order_id, status) {
    try {
      const res = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/orders?order_id=eq.${order_id}`, { method: 'PATCH', headers: this.getHeaders(), body: JSON.stringify({ status }) });
      return { success: res.ok };
    } catch (err) { return { success: false, error: { message: err.message } }; }
  }
};
