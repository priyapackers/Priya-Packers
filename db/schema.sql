CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS paper_reels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reel_id TEXT NOT NULL UNIQUE,
  reel_date DATE NOT NULL,
  gsm INTEGER NOT NULL CHECK (gsm > 0),
  reel_size TEXT NOT NULL,
  original_weight_kg NUMERIC(10, 2) NOT NULL CHECK (original_weight_kg > 0),
  remaining_weight_kg NUMERIC(10, 2) NOT NULL CHECK (remaining_weight_kg >= 0),
  source TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'partial', 'used')) DEFAULT 'available',
  last_company_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reel_usage_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_reel_id UUID NOT NULL REFERENCES paper_reels(id) ON DELETE RESTRICT,
  company_name TEXT NOT NULL,
  usage_date DATE NOT NULL,
  used_weight_kg NUMERIC(10, 2) NOT NULL CHECK (used_weight_kg > 0),
  usage_type TEXT NOT NULL CHECK (usage_type IN ('partial', 'full')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS paper_reels_filter_idx ON paper_reels (reel_date, gsm, reel_size, source, status);
CREATE INDEX IF NOT EXISTS reel_usage_events_reel_idx ON reel_usage_events (paper_reel_id, usage_date);
