// ============================================================
// config.js — SmartKitchen Frontend Configuration
// ⚠️  ห้าม Commit ไฟล์นี้ขึ้น GitHub (อยู่ใน .gitignore แล้ว)
// ============================================================

const CONFIG = {
  // Google Apps Script Web App URL (Deployed)
  GAS_URL: 'https://script.google.com/macros/s/AKfycbxYLjS6K73UoL_ky2JRjAByR5jWr0mutsADR1k5QAjqeRQ910OVmlI9DfUjiWnctgsg/exec',

  // Polling interval สำหรับหน้าครัว (milliseconds)
  POLLING_INTERVAL: 30000,

  // Cache duration สำหรับเมนู (milliseconds)
  MENU_CACHE_DURATION: 5 * 60 * 1000,

  // Delivery fee config
  FREE_DELIVERY_KM: 3,
  DELIVERY_RATE_PER_KM: 10,

  // Promo codes (ตรวจสอบที่ frontend ก่อน ส่ง GAS ยืนยันอีกครั้ง)
  PROMO_HINT: {
    'NEWFOOD10': 'ส่วนลด 10 บาท',
    'EATGOOD20': 'ส่วนลด 20 บาท'
  }
};
