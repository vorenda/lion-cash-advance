# Quick Start - Lion Cash Advance Database

## Database is Ready! ✅

Your database is already running and configured.

## 3 Commands to Get Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Visit: http://localhost:3000

### 3. View Database (Optional)
```bash
npm run db:studio
```
Visit: http://localhost:5555

---

## Test API Endpoints

### Contact Form
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@test.com","message":"Hello"}'
```

### Quote Request
```bash
curl -X POST http://localhost:3000/api/quote \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@test.com","phone":"555-1234","loanAmount":5000}'
```

### Callback Request
```bash
curl -X POST http://localhost:3000/api/callback \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob Johnson","phone":"555-5678","preferredTime":"afternoon"}'
```

### Subscribe
```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"subscriber@test.com"}'
```

---

## Database Commands

```bash
# Start database (if stopped)
npm run db:setup

# View database visually
npm run db:studio

# Stop database
docker stop lioncash_db

# Restart database
docker restart lioncash_db
```

---

## What's Ready

✅ PostgreSQL running on port 5434
✅ 6 database tables created
✅ 4 API routes ready
✅ Prisma ORM configured
✅ Helper functions ready

---

## Need More Info?

- **Full Documentation**: See `DATABASE.md`
- **Setup Summary**: See `DATABASE_SETUP_SUMMARY.md`

---

**Your database is ready for Lion Cash Advance!** 🚀
