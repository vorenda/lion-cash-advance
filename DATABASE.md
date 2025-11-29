# Database Setup - Lion Cash Advance

## Overview

Complete database infrastructure for Lion Cash Advance website with local development and production-ready configuration.

## Local Development

### Database Running
- **Container**: `lioncash_db`
- **Port**: `5434` (mapped from internal 5432)
- **Database**: `lioncash`
- **User**: `postgres`
- **Password**: `lioncash123`

### Quick Commands

```bash
# Start database (if stopped)
npm run db:setup

# Stop database
docker stop lioncash_db

# Restart database
docker restart lioncash_db

# View database logs
docker logs lioncash_db

# Access Prisma Studio (visual database browser)
npm run db:studio
```

### Access Prisma Studio
Run `npm run db:studio` and visit: http://localhost:5555

View and edit data in all tables:
- ContactForm
- QuoteRequest
- CallbackRequest
- Lead
- PageView
- EmailSubscriber

## Database Schema

### ContactForm
General contact form submissions

**Fields:**
- `id` - Unique identifier
- `name` - Contact name
- `email` - Contact email
- `phone` - Phone number (optional)
- `message` - Message text
- `sourceUrl` - Page where form was submitted
- `ipAddress` - Visitor IP
- `userAgent` - Browser info
- `status` - new | contacted | quoted | won | lost
- `notes` - Internal notes
- `createdAt` - Timestamp

### QuoteRequest
Loan quote/estimate requests

**Fields:**
- `id` - Unique identifier
- `name` - Applicant name
- `email` - Applicant email
- `phone` - Phone number
- `loanAmount` - Requested amount
- `loanPurpose` - Why they need the loan
- `employmentStatus` - employed | self-employed | unemployed | retired
- `income` - Monthly income
- `city`, `state`, `zipCode` - Location
- `status` - pending | approved | denied | contacted
- `sourceUrl`, `ipAddress`, `userAgent` - Metadata
- `createdAt` - Timestamp

### CallbackRequest
Callback scheduling

**Fields:**
- `id` - Unique identifier
- `name` - Contact name
- `phone` - Phone number
- `preferredTime` - morning | afternoon | evening | anytime
- `loanAmount` - Optional loan amount
- `urgency` - immediate | this-week | flexible
- `status` - pending | called | completed
- `calledAt` - When callback was completed
- `createdAt` - Timestamp

### Lead
Unified lead tracking (CRM)

**Fields:**
- `id` - Unique identifier
- `name` - Lead name
- `email` - Email (optional)
- `phone` - Phone number
- `source` - contact-form | quote-request | callback-request | manual
- `sourceId` - ID from source table
- `loanAmount` - Requested amount
- `city`, `state` - Location
- `status` - new | contacted | qualified | quoted | approved | denied | lost
- `notes` - CRM notes
- `assignedTo` - Staff member handling lead
- `nextFollowUp` - Next follow-up date
- `lastContactedAt` - Last contact timestamp
- `createdAt`, `updatedAt` - Timestamps

### PageView
Analytics tracking

**Fields:**
- `id` - Unique identifier
- `page` - Page URL
- `pageType` - home | city | state | service | pillar
- `city`, `state` - Location context
- `ipAddress`, `userAgent`, `referrer` - Visitor info
- `sessionId` - Session tracking
- `createdAt` - Timestamp

### EmailSubscriber
Newsletter subscribers

**Fields:**
- `id` - Unique identifier
- `email` - Email address (unique)
- `name` - Subscriber name (optional)
- `city`, `state` - Location context
- `subscribed` - Active status
- `unsubscribedAt` - Unsubscribe timestamp
- `createdAt` - Timestamp

## API Endpoints

### POST /api/contact

Submit contact form

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-123-4567",
  "message": "I need help with..."
}
```

**Response:**
```json
{
  "success": true,
  "id": "clxxxxxxxxxxxxxx"
}
```

**Auto-creates Lead** from submission

---

### POST /api/quote

Request loan quote

**Request:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "555-987-6543",
  "loanAmount": 5000,
  "loanPurpose": "Emergency expenses",
  "employmentStatus": "employed",
  "income": 4500,
  "city": "Dallas",
  "state": "Texas",
  "zipCode": "75201"
}
```

**Response:**
```json
{
  "success": true,
  "id": "clxxxxxxxxxxxxxx"
}
```

**Auto-creates Lead** with loan details

---

### POST /api/callback

Request callback

**Request:**
```json
{
  "name": "Bob Johnson",
  "phone": "555-555-5555",
  "preferredTime": "afternoon",
  "loanAmount": 3000,
  "urgency": "this-week"
}
```

**Response:**
```json
{
  "success": true,
  "id": "clxxxxxxxxxxxxxx"
}
```

**Auto-creates Lead** for follow-up

---

### POST /api/subscribe

Subscribe to newsletter

**Request:**
```json
{
  "email": "subscriber@example.com",
  "name": "Newsletter Reader",
  "city": "Austin",
  "state": "Texas"
}
```

**Response:**
```json
{
  "success": true,
  "id": "clxxxxxxxxxxxxxx",
  "message": "Successfully subscribed to newsletter"
}
```

## Helper Functions

Located in `src/lib/forms.ts`:

```typescript
// Form submissions
await submitContactForm({ name, email, phone, message })
await submitQuoteRequest({ name, email, phone, loanAmount, ... })
await submitCallbackRequest({ name, phone, preferredTime })

// Analytics
await trackPageView({ page, pageType, city, state })

// Newsletter
await subscribeNewsletter({ email, name, city, state })

// Lead management
await createLead({ name, email, phone, source, ... })
await updateLeadStatus(id, status, notes)
await getLeadsByStatus('new')
await getRecentLeads(10)
```

## Development Workflow

### 1. Start Development

```bash
# Start database
npm run db:setup

# Start Next.js dev server
npm run dev

# In another terminal: Open Prisma Studio
npm run db:studio
```

### 2. Test API Endpoints

```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello"}'

# Test quote request
curl -X POST http://localhost:3000/api/quote \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"555-1234","loanAmount":5000}'
```

### 3. View Submissions

Open Prisma Studio at http://localhost:5555 to see all submissions

## Production Setup

### Environment Variables

For production, update `.env` with production database URL:

```bash
# Digital Ocean Managed PostgreSQL (or other provider)
DATABASE_URL="postgresql://username:password@host:port/lioncash?sslmode=require"
```

### Deploy to Vercel/Digital Ocean

1. Set `DATABASE_URL` environment variable in deployment settings
2. Database tables will auto-create on first deployment
3. API routes work the same in production

## Maintenance

### Backup Database

```bash
# Export all data
docker exec lioncash_db pg_dump -U postgres lioncash > backup.sql

# Restore from backup
docker exec -i lioncash_db psql -U postgres lioncash < backup.sql
```

### Reset Database

```bash
# WARNING: Deletes all data!
npm run db:push -- --force-reset
```

### View Statistics

```bash
# Connect to database
docker exec -it lioncash_db psql -U postgres lioncash

# Run queries
SELECT COUNT(*) FROM "ContactForm";
SELECT COUNT(*) FROM "QuoteRequest";
SELECT COUNT(*) FROM "Lead" WHERE status = 'new';
```

## Troubleshooting

### Database not connecting

```bash
# Check container is running
docker ps | grep lioncash

# If not running, start it
npm run db:setup

# Check logs
docker logs lioncash_db
```

### Port already in use

If port 5434 is taken, change in:
1. `.env` - Update DATABASE_URL port
2. `package.json` - Update db:setup script port mapping

### Prisma errors

```bash
# Regenerate Prisma client
npm run db:generate

# Re-sync schema
npm run db:push
```

## Cost

- **Local Development**: FREE (Docker)
- **Production**: ~$15/month (Digital Ocean Managed PostgreSQL)

## Security

- `.env` file is in `.gitignore` (never committed)
- Production credentials stored in deployment platform
- Database password should be strong in production
- Consider SSL mode required for production
