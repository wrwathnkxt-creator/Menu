# 🍽️ SmartKitchen — Order Food Web App

ระบบสั่งอาหารและจัดการหลังร้านอัจฉริยะ
**Stack: GitHub Pages + Google Apps Script + Google Drive + Google Sheets**

🌐 **Live:** [https://wrwathnkxt-creator.github.io/Menu](https://wrwathnkxt-creator.github.io/Menu)

---

## 🏗️ สถาปัตยกรรมระบบ

```
GitHub Pages (Frontend)
       │  fetch() → CORS
Google Apps Script Web App (Backend/API)
       │  SpreadsheetApp
Google Sheets (Database) + Google Drive (รูปภาพ)
```

---

## 🗂️ โครงสร้างโฟลเดอร์

```
smartkitchen_githubpages/
├── docs/                   ← GitHub Pages root
│   ├── index.html          ← Login (เลือก Role)
│   ├── css/style.css       ← Design System
│   ├── js/
│   │   ├── config.js       ← ⚠️ ไม่ commit (อยู่ใน .gitignore)
│   │   ├── config.example.js ← ✅ template สำหรับ config.js
│   │   ├── api.js          ← GAS API wrapper
│   │   └── auth.js         ← RBAC session
│   └── pages/
│       ├── customer.html   ← สั่งอาหาร
│       ├── chef.html       ← คิวครัว
│       └── admin.html      ← Dashboard ผู้จัดการ
├── gas/
│   └── Code.gs             ← ⚠️ ไม่ commit (copy ใส่ GAS โดยตรง)
├── .gitignore
└── README.md
```

---

## ⚙️ วิธีติดตั้ง (Setup Guide)

### ขั้นตอนที่ 1 — Google Sheets
1. เปิด [Google Sheets](https://sheets.google.com) ของโปรเจกต์
2. ตรวจสอบว่ามี 3 sheets: `users`, `menu`, `orders`

### ขั้นตอนที่ 2 — Google Apps Script
1. เปิด [script.google.com](https://script.google.com)
2. เลือกโปรเจกต์ที่ผูกกับ Sheets
3. Copy code จาก `gas/Code.gs` วางแทนที่ทั้งหมด
4. Deploy → New Deployment → Web App
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy **Web App URL**

### ขั้นตอนที่ 3 — Frontend Config
```bash
cp docs/js/config.example.js docs/js/config.js
```
แก้ไข `config.js` ใส่ Web App URL ที่ได้จากขั้นตอนที่ 2

### ขั้นตอนที่ 4 — GitHub Pages
1. Push ขึ้น GitHub (โดย `config.js` จะถูก ignore)
2. Settings → Pages → Source: `main` branch → `/docs` folder
3. รอ ~1 นาที จะได้ URL: `https://username.github.io/repo/`

---

## 👥 บัญชีผู้ใช้งาน (Roles)

| Role | หน้าที่ | หน้า |
|------|---------|------|
| `customer` | สั่งอาหาร (ไม่ต้อง login) | customer.html |
| `chef` | จัดการคิวครัว | chef.html |
| `admin` | Dashboard, สต็อก | admin.html |

---

## 🔌 GAS API Endpoints

| Action | Method | คำอธิบาย |
|--------|--------|---------|
| `getMenu` | GET | ดึงเมนูทั้งหมด |
| `getOrders` | GET | ดึง orders (กรอง status ได้) |
| `getStats` | GET | KPI สำหรับ Admin |
| `login` | GET | ตรวจสอบ credential |
| `validatePromo` | GET | ตรวจสอบโค้ดส่วนลด |
| `createOrder` | POST | สร้างออเดอร์ใหม่ |
| `updateStatus` | POST | เปลี่ยนสถานะออเดอร์ |
| `addMenu` | POST | เพิ่มเมนูใหม่ |
| `updateStock` | POST | อัปเดตสต็อก |
| `toggleAvailable` | POST | เปิด/ปิดขาย |

---

## 🔒 Security

- `config.js` (มี GAS URL) → อยู่ใน `.gitignore` ไม่ถูก push
- `gas/Code.gs` → อยู่ใน `.gitignore` copy/paste ใส่ GAS โดยตรง
- GAS deploy "Execute as: Me" → ซ่อน Spreadsheet ID จาก client
- ไม่มี token หรือ password ใน source code

---

## 📊 ฐานข้อมูล

**Google Sheets** — ไม่ใช่ SQL
- Sheet `users` — บัญชีผู้ใช้และ role
- Sheet `menu` — เมนูอาหาร + สต็อก
- Sheet `orders` — ประวัติคำสั่งซื้อ

---

*🤖 Built with Antigravity — SmartKitchen Project v2.0*
