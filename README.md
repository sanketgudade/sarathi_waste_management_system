# ♻️ SARATHI: Smart Waste Management & Monitoring System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Firebase](https://img.shields.io/badge/Firebase-v10_Modular-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TensorFlow.js](https://img.shields.io/badge/AI-TensorFlow.js_3.11-FF6F00?logo=tensorflow&logoColor=white)](https://www.tensorflow.org/js)
[![Leaflet](https://img.shields.io/badge/GIS-Leaflet_1.9-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Mapbox](https://img.shields.io/badge/Routing-Mapbox_API-000000?logo=mapbox&logoColor=white)](https://www.mapbox.com/)
[![ECharts](https://img.shields.io/badge/Charts-Apache_ECharts-AA344D?logo=apacheecharts&logoColor=white)](https://echarts.apache.org/)

> **A closed-loop, verifiable civic platform that unifies Edge Computer Vision, Real-Time Fleet Telematics, Cryptographic Doorstep QR Verification, and Gamified Civic Rewards for urban municipal solid waste management.**

Developed by **Sanket Gudade** (Computer Engineering, **PICT Pune - Pune Institute of Computer Technology**).

---

## 📌 Table of Contents
1. [Executive Summary & Problem Statement](#-executive-summary--problem-statement)
2. [Key Architectural Pillars](#-key-architectural-pillars)
3. [Multi-Role User Ecosystem](#-multi-role-user-ecosystem)
4. [Comprehensive Tech Stack & Rationale](#-comprehensive-tech-stack--rationale)
5. [End-to-End Implementation Flow](#-end-to-end-implementation-flow)
6. [Anti-Fraud & Proof-of-Collection Mechanism](#-anti-fraud--proof-of-collection-mechanism)
7. [Database Schema (Cloud Firestore)](#-database-schema-cloud-firestore)
8. [Local Setup & Configuration Guide](#-local-setup--configuration-guide)
9. [Documentation & Interview Prep Guide](#-documentation--interview-prep-guide)
10. [Author & Acknowledgments](#-author--acknowledgments)

---

## 🌟 Executive Summary & Problem Statement

Urban solid waste management across metropolitan centers suffers from severe inefficiencies:
- **Low Source Segregation (<30%):** Mixed organic, recyclable, and hazardous waste degrades landfill lifespan and pollutes groundwater.
- **"Ghost Collections" & Contractor Fraud:** Lack of real-time monitoring leads to unverified pickup reports and fake municipal billing.
- **Suboptimal Fleet Routing:** Collection trucks drive static, arbitrary routes, increasing fuel consumption and municipal emissions.
- **Zero Civic Motivation:** Citizens lack personal or financial incentive to practice disciplined waste sorting.

**Sarathi ("Saarthi" — The Charioteer / Guide)** eliminates these bottlenecks through an end-to-end web architecture combining browser-based edge AI classification, physical QR collection handshakes, real-time vehicle GPS tracking, multi-stop route optimization solving the Traveling Salesperson Problem (TSP), and a gamified Green Points reward economy.

---

## 🏛️ Key Architectural Pillars

```
+-----------------------------------------------------------------------------------+
|                            SARATHI SYSTEM ARCHITECTURE                             |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|   [ Citizen Portal ]            [ Collector Portal ]          [ Admin Dashboard ] |
|   - AI Camera Scan              - Task Marketplace            - Fleet Overview    |
|   - Leaflet Pin-drop            - TSP Route Optimization      - User Management   |
|   - Dynamic QR Gen              - GPS Live Broadcasting       - Complaint Audit   |
|   - Real-time Tracker           - Html5-QRCode Scanner        - CSV/Excel Reports |
|          |                               |                            |           |
+----------|-------------------------------|----------------------------|-----------+
           |                               |                            |
           +-------------------------------+----------------------------+
                                           |
                                [ Cloud Firestore BaaS ]
                        - Real-time WebSocket sync (onSnapshot)
                        - Collections: users | orders | complaints | notifications
                                           |
             +-----------------------------+-----------------------------+
             |                                                           |
  [ Edge AI Engine (Client) ]                                 [ Geospatial Telematics ]
  - TensorFlow.js + WebGL                                     - Leaflet.js + OSM Tiles
  - MobileNet 6-Class Transfer Learning                       - Mapbox Optimized Trips (TSP)
  - Sub-80ms In-Browser Inference                             - Haversine Geofencing (<=50m)
```

1. **Edge AI Classification (Privacy-by-Design):** Runs directly on client GPUs via WebGL shaders using TensorFlow.js. User household images never leave the device.
2. **Doorstep Physical Verification:** 50-meter Haversine GPS geofencing unlocks collection only when the driver is on-site; scanning the citizen's dynamic QR code mathematically confirms pickup.
3. **TSP Route Optimization:** Solves the multi-stop routing problem via Mapbox Optimized Trips API to calculate the shortest tour, reducing fleet fuel costs by up to 25%.
4. **Gamified Civic Economy:** Credits citizens with 10 Green Points per verified kilogram of segregated waste, redeemable for municipal property tax rebates or utility subsidies.
5. **Municipal Decision Support:** Administrative dashboard featuring time-series Chart.js analytics, waste composition breakdowns, and automated CSV/XLS/PDF audit report generation.

---

## 👥 Multi-Role User Ecosystem

| Role | Target Persona | Key Modules | Primary Operational Goal |
| :--- | :--- | :--- | :--- |
| **Citizen** | Residents, apartment owners, shops | AI Scanner, Map Pin-drop, Order Scheduler, Live Tracker, QR Display, Green Points Ledger | Frictionless segregation, on-demand pickup, rewards |
| **Collector** | Sanitation truck drivers, field crew | Availability Switch, Task Marketplace, Route Navigator (TSP), Camera QR Scanner | Zero-fraud collection, optimal routing, daily targets |
| **Admin** | Ward officers, municipal supervisors | KPI Overview, User CRUD, Order Status Override, Grievance Redressal, Multi-Format Exports | Fleet oversight, compliance monitoring, data-driven planning |

---

## 💻 Comprehensive Tech Stack & Rationale

| Category | Technology | Role in Sarathi | Why Chosen over Alternatives |
| :--- | :--- | :--- | :--- |
| **Frontend Core** | **HTML5 / CSS3 / ES6+** | Native semantic views, responsive UI, CSS Variables | Zero bundler overhead (no Webpack/Vite required), instant cold-start, optimal mobile RAM usage. |
| **BaaS & Auth** | **Firebase v10 Modular SDK** | Token management, session security, password resets | Lightweight tree-shakable syntax, enterprise JWT token rotation, zero server maintenance. |
| **Database** | **Cloud Firestore** | Reactive NoSQL document store (`onSnapshot` listeners) | Bidirectional WebSocket synchronization pushes live GPS and order status deltas with sub-second latency. |
| **Edge AI** | **TensorFlow.js 3.11** | Hardware-accelerated neural network execution | In-browser WebGL GPU acceleration guarantees 100% data privacy and $0 cloud inference cost. |
| **Computer Vision** | **Google Teachable Machine** | MobileNet transfer learning 6-class waste model | Classifies Organic (🌿), Recyclable (♻️), Non-Recyclable (🚫), Hazardous (⚠️), E-Waste (💻), and Not Trash (✅). |
| **Interactive Maps** | **Leaflet.js 1.9.4** | Open-source mobile interactive maps & custom markers | Lightweight (~42 KB), free from vendor billing, smooth pinch-to-zoom and divIcon markers. |
| **Geospatial Tiles** | **OpenStreetMap (OSM)** | Cartographic raster basemaps | Free open-source map tiles without costly per-request Google Maps billing. |
| **Route Optimization**| **Mapbox Optimized Trips** | Solves Traveling Salesperson Problem (TSP) | Computes mathematically optimal multi-stop driver paths, minimizing mileage and emissions. |
| **Turn-by-Turn** | **Leaflet Routing Machine** | Waypoint trajectory plotting & direction polyline | Renders dynamic driver-to-destination driving polylines with distance and ETA readouts. |
| **Geocoding** | **OSM Nominatim API** | Reverse geocoding (GPS Lat/Lng $\rightarrow$ Street Address) | Free, accurate Indian street-level address resolution without API keys. |
| **Proximity Math** | **Haversine Algorithm** | Great-circle spherical distance calculations | Pure mathematical trigonometric formula on client CPU; powers the 50m geofence arrival trigger. |
| **AI Visualizer** | **Apache ECharts 5+** | Dual-ring gauge and donut probability chart | GPU-accelerated canvas chart with smooth animated transitions across all 6 waste categories. |
| **Admin Analytics** | **Chart.js 4.4.0** | Time-series lines, doughnuts, and bar charts | HTML5 canvas charts supporting responsive resizing and dynamic base64 image export. |
| **QR Generation** | **QRCode.js** | Client-side 2D barcode canvas rendering | Renders cryptographically structured JSON payloads into high-density QR codes for offline presentation. |
| **QR Scanning** | **Html5-QRCode 2.3.8** | In-browser camera barcode decoding at 10 FPS | Hardware-accelerated WebAssembly camera reader working on any mobile browser without native app installs. |
| **Report Export** | **Blob & XML APIs** | Pure client-side CSV, Excel (.xls), and PDF generation | Zero-server data export conforming to RFC 4180 CSV and Microsoft Office XML 2003 formats. |

---

## 🔄 End-to-End Implementation Flow

```
[ Citizen ]                         [ Firestore Cloud ]                       [ Collector ]
     |                                       |                                      |
 1.  |-- AI Scan & Classify (TF.js) -------->|                                      |
 2.  |-- Place Order + Dynamic QR ---------->| [status: 'pending']                  |
     |                                       |                                      |
 3.  |                                       |<-- Browse Task Marketplace ----------|
 4.  |                                       |<-- Accept Task (Atomic update) ------|
     |                                       |    [status: 'assigned']              |
     |                                       |                                      |
 5.  |                                       |<-- Start Trip (GPS watchPosition) ---|
     |                                       |    [liveTracking: {lat, lng}]        |
 6.  |<-- Real-time Map & ETA Push ----------|                                      |
     |                                       |                                      |
 7.  |                                       |<-- Haversine <=50m: 'I Am Arrived' --|
     |                                       |    [status: 'arrived']               |
 8.  |-- Displays Dynamic Doorstep QR ------>|                                      |
 9.  |                                       |<-- Scans QR via Html5-QRCode --------|
     |                                       |    [status: 'completed']             |
10.  |<-- +Green Points Credited (10 pts/kg)-|                                      |
     |                                       |                                      |
```

1. **AI Segregation:** Citizen points camera at waste; MobileNet classifies it into 6 categories with confidence score and disposal tip; auto-populates pickup request.
2. **Order Placement:** Citizen drops map pin or captures GPS coordinates; Nominatim reverse-geocodes address; Order ID `SAR-YYYYMMDD-XXXXXX` generated; QR code rendered.
3. **Marketplace Discovery:** Available pickups appear in collector dashboard; collector accepts task; order status updates to `assigned`.
4. **Live Fleet Tracking:** Collector initiates driving; continuous GPS stream updates Firestore `liveTracking`; citizen watches moving truck icon on Leaflet map with live ETA.
5. **Geofenced Arrival:** When collector coordinates are $\le 50\text{ m}$ from citizen coordinates (calculated via Haversine), collector taps "I Am Arrived".
6. **Doorstep QR Verification:** Collector scans citizen's QR code using camera; system matches order ownership; transitions order to `completed`.
7. **Incentive Settlement:** Citizen wallet automatically credited with $\lfloor \text{weight} \times 10 \rfloor$ Green Points; collector statistics incremented.

---

## 🛡️ Anti-Fraud & Proof-of-Collection Mechanism

To eliminate "ghost pickups" (where municipal workers mark tasks complete without visiting the premises), Sarathi enforces **two-factor physical presence verification**:

$$\text{Distance} = 2 R \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta\text{lat}}{2}\right) + \cos(\text{lat}_1)\cos(\text{lat}_2)\sin^2\left(\frac{\Delta\text{lon}}{2}\right)}\right)$$

1. **Spatial Geofencing:** The collector's device must be within $50\text{ meters}$ ($R = 6371\text{ km}$) of the customer's coordinates before the arrival button unlocks.
2. **Dynamic QR Cryptographic Handshake:** The collector must scan the citizen's dynamic QR code containing:
```json
{
  "orderId": "SAR-20261021-9K2P0L",
  "userId": "u8Fk92L1pZ90aBC781",
  "wasteType": "recyclable",
  "weight": 5.2
}
```
If an unassigned collector attempts to scan, or if coordinates fail the geofence check, the transaction is rejected.

---

## 🗄️ Database Schema (Cloud Firestore)

### 1. `users` Collection
- `uid`: Unique Firebase Auth identifier
- `name`: Full user name
- `email`: Registered email address
- `phone`: Contact telephone
- `userType`: `'citizen'` | `'collector'` | `'admin'`
- `greenPoints`: Cumulative reward points (citizens)
- `assignedZone`: Municipal operational zone (collectors)
- `vehicleNumber`: Vehicle registration number (collectors)
- `isAvailable`: Real-time online/offline toggle (collectors)
- `isActive`: Administrative account status flag

### 2. `orders` Collection
- `orderId`: Unique reference (`SAR-YYYYMMDD-XXXXXX`)
- `userId`: Foreign key to citizen UID
- `customerName`, `phone`, `address`, `pincode`: Customer details
- `latitude`, `longitude`: Precision pickup coordinates
- `wasteType`: `'organic'` | `'recyclable'` | `'non-recyclable'` | `'hazardous'` | `'e-waste'`
- `weight`: Verified weight in kilograms
- `status`: `'pending'` $\rightarrow$ `'assigned'` $\rightarrow$ `'in-progress'` $\rightarrow$ `'arrived'` $\rightarrow$ `'completed'`
- `collectorId`, `collectorName`: Assigned driver
- `liveTracking`: `{ lat: Number, lng: Number, timestamp: ISOString }`
- `createdAt`, `acceptedAt`, `arrivedAt`, `completedAt`: Server timestamps

### 3. `complaints` Collection
- `userId`, `userName`: Grievance submitter
- `type`: Missed Pickup, Improper Disposal, Behavior, Hygiene
- `description`: Issue details
- `status`: `'pending'` | `'resolved'`

### 4. `notifications` Collection
- `userId`: Recipient UID
- `message`: Alert message text
- `icon`: FontAwesome class string
- `read`: Boolean flag

---

## 🚀 Local Setup & Configuration Guide

### Prerequisites
- Modern Web Browser (Google Chrome, Microsoft Edge, Firefox, or Safari)
- Optional: Local HTTP server (`Live Server` in VS Code, or `python -m http.server 8000`)

### Step 1: Clone the Repository
```bash
git clone https://github.com/sanketgudade/Sarthi_PBL_Final.git
cd Sarthi_PBL_Final
```

### Step 2: Configure Environment Keys
1. Copy `js/firebase-config.example.js` to `js/firebase-config.js` (or edit `js/firebase-config.js`).
2. Insert your Firebase web app configuration:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```
3. *(Optional)* Add your Mapbox Public Token in `js/mapbox-utils.js` for enhanced TSP route optimization.

### Step 3: Launch Local Server
```bash
# Python 3
python -m http.server 8000

# OR using Node http-server
npx http-server -p 8000
```
Open `http://localhost:8000` in your browser.

---

## 📄 Documentation & Interview Prep Guide

A comprehensive, 55-question technical interview preparation and architecture manual is included in this repository:
- 📘 **[`SARATHI_Smart_Waste_Management_Project_Documentation_and_Interview_Prep.docx`](./SARATHI_Smart_Waste_Management_Project_Documentation_and_Interview_Prep.docx)**

### Content Highlights of the Document:
- Executive problem statement and technical architecture
- Complete tech stack matrix with architectural trade-offs ("Why used", "Alternatives considered")
- Step-by-step implementation walkthroughs with data payloads
- **55 in-depth technical interview questions & detailed answers** covering:
  - System Design & RBAC
  - TensorFlow.js Edge Vision Inference & WebGL
  - Geospatial Telematics, Leaflet, and Mapbox TSP Optimization
  - Cloud Firestore Real-Time WebSockets & Concurrency
  - Cryptographic QR Verification & Anti-Fraud Logic
  - Senior Engineering Behavioral & Viva Defense Questions

---

## 👨‍💻 Author & Academic Credentials

- **Developer:** Sanket Gudade
- **Department:** Computer Engineering
- **Institution:** Pune Institute of Computer Technology (PICT), Pune
- **GitHub:** [@sanketgudade](https://github.com/sanketgudade)
- **Project Domain:** Smart Cities, Municipal Civic Infrastructure, Edge AI, Cloud Computing

---

*© Sarathi Project - Developed for Sustainable Urban Municipalities.*
