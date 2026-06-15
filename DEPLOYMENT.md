# Rutvik Gohel Portfolio — Deployment Guide

## Prerequisites

- Node.js 20+
- .NET 8 SDK
- PostgreSQL 16+
- A Gmail account (for contact form emails)

---

## Step 1 — Frontend Setup

```bash
cd rutvik-portfolio/frontend

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Build for production
npm run build
# → dist/ folder ready to deploy
```

---

## Step 2 — Backend Setup

### 2a. Configure Environment

Edit `backend/src/Portfolio.API/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=portfolio_dev;Username=postgres;Password=YOUR_PG_PASSWORD"
  },
  "Email": {
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": "587",
    "SmtpUser": "your-gmail@gmail.com",
    "SmtpPass": "your-app-password-from-google"
  }
}
```

**Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords → Generate

### 2b. Database Migration

```bash
cd backend/src/Portfolio.API

# Install EF Core tools if not already
dotnet tool install --global dotnet-ef

# Create initial migration
dotnet ef migrations add InitialCreate --project ../Portfolio.Infrastructure

# Apply migration (auto-applied on startup too)
dotnet ef database update --project ../Portfolio.Infrastructure
```

### 2c. Run Backend

```bash
cd backend/src/Portfolio.API
dotnet run
# → http://localhost:5000
# → Swagger UI: http://localhost:5000/swagger
```

---

## Step 3 — Add Your Resume PDF

Copy your resume PDF to:
```
frontend/public/resume.pdf
```
It will be served at `/resume.pdf` and downloaded as `Rutvik_Gohel_Resume.pdf`.

---

## Step 4 — Production Deployment

### Frontend → Vercel (Recommended)

1. Push to GitHub
2. Import repo in Vercel
3. Framework: Vite
4. Build: `npm run build`
5. Output: `dist`
6. Add env var: `VITE_API_URL=https://your-api-domain.com`

### Backend → Railway / Render / Azure

**Railway (Easiest):**
1. Create Railway project
2. Add PostgreSQL service
3. Deploy `backend/` folder
4. Set env vars: `ConnectionStrings__DefaultConnection`, `Email__SmtpUser`, `Email__SmtpPass`

**Azure App Service:**
```bash
dotnet publish -c Release -o ./publish
# Deploy publish/ folder to Azure App Service
```

### Frontend API URL (production)

Update `frontend/vite.config.ts` proxy target to your deployed API URL, or use:
```
VITE_API_URL=https://api.rutvikgohel.dev
```

---

## Step 5 — Domain Setup

1. Buy domain: `rutvikgohel.dev` (or similar)
2. Vercel → Add custom domain
3. Point DNS A record to Vercel IPs
4. API subdomain: `api.rutvikgohel.dev` → backend host

---

## Environment Variables Summary

| Variable | Where | Description |
|----------|-------|-------------|
| `ConnectionStrings__DefaultConnection` | Backend | PostgreSQL connection string |
| `Email__SmtpUser` | Backend | Gmail address |
| `Email__SmtpPass` | Backend | Gmail App Password |
| `Email__OwnerEmail` | Backend | Your email (rutvikgohel2002@gmail.com) |

---

## Local Development (Both Simultaneously)

Terminal 1 (Frontend):
```bash
cd frontend && npm run dev
```

Terminal 2 (Backend):
```bash
cd backend/src/Portfolio.API && dotnet run
```

Frontend proxies `/api/*` to `localhost:5000` via vite.config.ts.

---

## SEO Checklist

- [ ] Add `/public/og-image.png` (1200x630px) for social sharing
- [ ] Update LinkedIn URL in `src/lib/constants.ts` if changed
- [ ] Verify GitHub URL in constants matches actual profile
- [ ] Submit sitemap to Google Search Console after deploy
- [ ] Add Google Analytics (optional — replace comment in index.html)

---

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion + GSAP |
| 3D Elements | Three.js + React Three Fiber |
| Smooth Scroll | Lenis |
| Form Validation | React Hook Form + Zod |
| Backend | ASP.NET Core 8 |
| Architecture | Clean Architecture + CQRS + MediatR |
| ORM | Entity Framework Core 8 |
| Database | PostgreSQL 16 |
| Email | SMTP via Gmail |
| API Docs | Swagger / OpenAPI |
