-- AtlasOrc: Initial schema
-- Supabase Postgres Best Practices: RLS on every user-data table,
-- indexes on frequently queried columns, created_at always timestamptz

-- ── Contact Submissions ────────────────────────────────────────────────────
create table if not exists contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null check (char_length(name) <= 200),
  email       text        not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone       text        not null default '' check (char_length(phone) <= 30),
  message     text        not null check (char_length(message) <= 5000),
  created_at  timestamptz not null default now()
);

-- Index on created_at for time-based queries
create index if not exists contact_submissions_created_at_idx
  on contact_submissions (created_at desc);

-- RLS: only service-role can read; no anon insert (server action handles writes)
alter table contact_submissions enable row level security;

create policy "service_role_full_access" on contact_submissions
  for all
  to service_role
  using (true)
  with check (true);

-- ── Newsletter Subscribers ─────────────────────────────────────────────────
create table if not exists newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text        not null unique check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subscribed  boolean     not null default true,
  created_at  timestamptz not null default now()
);

create index if not exists newsletter_subscribers_email_idx
  on newsletter_subscribers (email);

alter table newsletter_subscribers enable row level security;

create policy "service_role_full_access" on newsletter_subscribers
  for all
  to service_role
  using (true)
  with check (true);
