# Haven Realty & Plots • Real Estate Property & Lead Generation Platform

A complete, production-ready real estate property and lead generation platform designed for property/plot businesses and optimized for **Meta Ads (Facebook & Instagram)** and **Google Ads** conversions.

Built with **JavaScript (ES6+ / React)**, **Next.js 14 (App Router)**, **Tailwind CSS**, **MongoDB & Mongoose**, **Cloudinary Media Storage**, and **JWT Authentication**.

---

## 🌟 Core Modules

### 1. 🌐 Public Website (`/`)
- **Conversion-Focused Hero**: Professional headline, supporting text, **Explore Properties** primary button, **Contact Us** secondary button, and **WhatsApp** CTA button.
- **Multi-Criteria Property Search**:
  - Filter by Location / Corridor (Jagatpura, Ajmer Road, Tonk Road, Mansarovar, Kukas, Sirsi Road)
  - Property Type (Residential Plot, Commercial Plot, Plot, Luxury Villa, Farmhouse Land, Commercial Land)
  - Minimum & Maximum Price Range
  - Minimum & Maximum Size (sq ft / Gaj)
  - Status (Available, Reserved, Sold)
  - Sorting (Newest, Price: Low to High, Price: High to Low, Size: Largest)
- **High-Converting Property Detail Pages (`/properties/[slug]`)**:
  - SEO-friendly dynamic URLs (`/properties/[property-slug]`)
  - Image Gallery with thumbnail navigation and fullscreen Lightbox
  - Walkthrough / drone video section (completely hidden if no video is present)
  - Detailed specifications: Facing direction, Road width, Legal approvals, Amenities, Nearby landmarks
  - **Sticky Mobile Bottom Bar**: Fixed `Call Now | WhatsApp | Enquire` bar for mobile visitors
- **Lead Generation & UTM Attribution**:
  - Capture Name, Phone, Email, Budget, Message
  - Automatically captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, landing page, and referrer
  - Client & server validation + duplicate submission prevention
  - Meta Pixel lead conversion event trigger (`fbq('track', 'Lead')`)
- **Direct WhatsApp Integration**:
  - Pre-filled custom enquiry messages with property title, location, and price
- **Corporate & Compliance Pages**:
  - `/about` (Company story, pillars, verified title commitment)
  - `/contact` (Direct enquiry form, phone, WhatsApp, office details)
  - `/privacy-policy` & `/terms` (Compliant with Meta advertisement policies)
  - Dynamic `sitemap.xml` and `robots.txt`

---

### 2. 🔐 Admin Portal (`/admin`)
- **Secure Authentication**:
  - Protected routes under `/admin/*` (unauthenticated visitors redirected to `/admin/login`)
  - JWT token verification with HTTP-only cookies and Bearer authorization support
  - Default Administrator: `admin@havenestate.com` / `admin123`
- **Dashboard Overview (`/admin`)**:
  - Real-time statistics: Total Properties, Available, Reserved, Sold, Total Leads, New Leads, Contacted, Converted
  - Recent Leads with status pills and 1-click dossier opening
  - Recent Properties list
- **Property Inventory Management (`/admin/properties`)**:
  - Create, edit, delete, search, and filter properties
  - Auto-generating URL slug with custom editing capability
  - Status management (`Available`, `Reserved`, `Sold`, `Hidden`)
  - Hidden properties stay completely unlisted from the public website
- **Media Upload Manager**:
  - Multi-image upload from desktop or smartphone
  - Select cover image with 1-click badge toggle
  - Reorder images with left/right controls
  - Delete photos
  - Property video upload and preview
  - Cloudinary cloud storage integration with local fallback
- **Basic CRM & Lead Management (`/admin/leads`)**:
  - Pipeline status stages: `New` ➔ `Contacted` ➔ `Interested` ➔ `Site Visit` ➔ `Negotiation` ➔ `Converted` ➔ `Lost`
  - Customer contact details, interested property, budget, and customer message
  - Ad attribution details: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, landing page, referrer
  - Internal follow-up notes thread with timestamp and author attribution
  - Direct 1-click **Call** and **WhatsApp** actions
- **Marketing Analytics (`/admin/analytics`)**:
  - Lead conversion rate KPI
  - Weekly and monthly inquiry volume
  - Leads by acquisition channel (Facebook, Instagram, Google, Direct)
  - Leads by Meta Ad campaign tag
- **Business Profile Settings (`/admin/settings`)**:
  - Dynamic company name, phone, WhatsApp number, email, address, and social links
  - Meta Pixel ID configuration

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14+ (App Router) |
| **Language** | JavaScript (ES6+ / React 18) — *No TypeScript* |
| **Styling** | Tailwind CSS (Clean, premium, mobile-first design) |
| **Icons** | Lucide React |
| **Database** | MongoDB & Mongoose (with seamless local fallback store) |
| **Media Storage**| Cloudinary (with fallback local data-URI preview handler) |
| **Authentication**| JWT (`jsonwebtoken`) + `bcryptjs` password hashing |
| **Marketing** | Meta Pixel integration + UTM campaign parameter tracking |

---

## 🚀 Quick Start Guide

### 1. Environment Setup
Create a `.env.local` file (or copy from `.env.example`):

```bash
# MongoDB Connection (Optional for local testing; app includes built-in fallback)
MONGODB_URI=mongodb://localhost:27017/haven_estate

# JWT Authentication Secret
NEXTAUTH_SECRET=haven_estate_development_jwt_secret_key_2026_xyz

# Cloudinary Storage (Optional for local testing)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Business Contact Settings
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_PHONE_NUMBER=+91 98765 43210

# Meta Pixel Tracking ID (Facebook / Instagram Ads)
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Start Production
```bash
npm run build
npm start
```

---

## 🔑 Default Admin Credentials

- **URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email**: `admin@havenestate.com`
- **Password**: `admin123`
*(A "Fill Demo" shortcut button is provided on the login page for instant access)*

---

## 📱 Mobile-First Meta Ads User Flow

```text
Facebook / Instagram Ad (with UTM params)
                  ↓
Public Property Page (/properties/[slug])
                  ↓
Customer Inspects Gallery & Video
                  ↓
Sticky Mobile Contact Bar (Call / WhatsApp / Enquire)
                  ↓
Enquiry Submitted & Meta Pixel Lead Event Triggered
                  ↓
Stored in Database with UTM Attribution
                  ↓
Instant Notification in Admin CRM Dashboard
                  ↓
Admin Calls or Sends WhatsApp Follow-up to Customer
```
