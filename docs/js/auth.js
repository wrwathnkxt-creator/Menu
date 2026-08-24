// ============================================================
// auth.js — RBAC Session Management
// จัดการ Login, Session, Role Guard
// ============================================================

const Auth = {

  // ── Login ─────────────────────────────────────────────────
  async login(email, password) {
    const res = await API.login(email, password);
    if (res.success) {
      localStorage.setItem('sk_user', JSON.stringify(res.data));
      return { ok: true, user: res.data };
    }
    return { ok: false, message: res.error?.message || 'เข้าสู่ระบบล้มเหลว' };
  },

  // ── Logout ────────────────────────────────────────────────
  logout() {
    localStorage.removeItem('sk_user');
    window.location.href = '../index.html';
  },

  // ── Get current session ───────────────────────────────────
  getUser() {
    try {
      return JSON.parse(localStorage.getItem('sk_user'));
    } catch {
      return null;
    }
  },

  // ── Role Guard — redirect ถ้า role ไม่ตรง ─────────────────
  requireRole(allowedRole) {
    const user = this.getUser();
    if (!user) {
      window.location.href = '../index.html';
      return null;
    }
    if (user.role !== allowedRole) {
      alert(`ไม่มีสิทธิ์เข้าถึงหน้านี้ (ต้องการ role: ${allowedRole})`);
      window.location.href = '../index.html';
      return null;
    }
    return user;
  },

  // ── Customer login (ไม่ต้อง email/password) ───────────────
  loginAsCustomer() {
    localStorage.setItem('sk_user', JSON.stringify({
      email: 'guest',
      role:  'customer',
      name:  'ลูกค้า'
    }));
    window.location.href = 'pages/customer.html';
  }
};
