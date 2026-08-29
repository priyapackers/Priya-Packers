# Admin Stock Module Setup

The private owner module is available under `/admin` and is designed for paper reel stock management.

## Required Environment Variables

Add these in Vercel after connecting the Neon PostgreSQL database:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST/dbname?sslmode=require"
ADMIN_PASSWORD_HASH="generated-password-hash"
SESSION_SECRET="long-random-session-secret"
```

## Generate Admin Password Hash

Do not store the owner password directly in the app. Generate a hash locally and store only the hash in Vercel:

```bash
npm run admin:hash-password -- 'your-secure-password'
```

Copy the output into `ADMIN_PASSWORD_HASH`.

## Apply Database Schema

After `DATABASE_URL` is configured, create the stock tables with:

```bash
npm run db:schema
```

## What Is Stored

- Paper reel master data is stored in `paper_reels`.
- Usage records are stored separately in `reel_usage_events`.
- Admin sessions use signed HTTP-only cookies.
