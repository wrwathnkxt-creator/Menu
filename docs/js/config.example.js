// ============================================================
// config.example.js — ตัวอย่าง config สำหรับ Developer ใหม่
// ⚠️  Copy ไฟล์นี้เป็น config.js แล้วใส่ข้อมูลจริงของคุณ
//     config.js จะ NOT ถูก commit (อยู่ใน .gitignore)
// ============================================================

const CONFIG = {
  // วาง Google Apps Script Web App URL ของคุณที่นี่
  // วิธีหา: script.google.com → Deploy → Manage deployments → Copy URL
  GAS_URL: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec',

  // Polling interval สำหรับหน้าครัว (milliseconds) — แนะนำ 30000
  POLLING_INTERVAL: 30000,

  // Cache duration สำหรับเมนู (milliseconds) — แนะนำ 5 นาที
  MENU_CACHE_DURATION: 5 * 60 * 1000,

  // Delivery fee config (ตามธุรกิจ)
  FREE_DELIVERY_KM: 3,       // กิโลเมตรแรกที่ฟรีค่าจัดส่ง
  DELIVERY_RATE_PER_KM: 10,  // ราคาต่อกิโลเมตร (บาท)

  // Promo codes (แสดง hint ที่ frontend เท่านั้น — GAS จะยืนยันจริง)
  PROMO_HINT: {
    'NEWFOOD10': 'ส่วนลด 10 บาท',
    'EATGOOD20': 'ส่วนลด 20 บาท'
  }
};
