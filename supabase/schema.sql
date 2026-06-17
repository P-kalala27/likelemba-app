-- ═══════════════════════════════════════════════════════════════════════════
-- LIKELEMBAAPP — Schéma de base de données PostgreSQL
--
-- INSTRUCTIONS :
-- 1. Va sur ton projet Supabase → SQL Editor → New query
-- 2. Colle TOUT ce fichier
-- 3. Clique "Run"
-- 4. Vérifie qu'il n'y a aucune erreur en rouge dans les résultats
-- ═══════════════════════════════════════════════════════════════════════════


-- ── EXTENSIONS ────────────────────────────────────────────────────────────
-- uuid-ossp : permet de générer des identifiants uuid (uuid_generate_v4())
create extension if not exists "uuid-ossp";


-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE : PROFILES
-- Étend la table système auth.users avec les infos propres à LikelembaApp.
-- auth.users contient : id, phone, email (géré par Supabase Auth)
-- profiles contient   : name, role, score, mobile_money_number (notre métier)
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.profiles (
  id                   uuid primary key references auth.users(id) on delete cascade,
  -- Sprint 1-5 : auth par EMAIL (gratuit, illimité sur Supabase).
  -- Sprint 6+  : on basculera vers SMS (Africa's Talking), phone deviendra
  --              la méthode d'auth principale. Les deux colonnes coexistent
  --              pour permettre une migration progressive sans tout casser.
  email                text unique,
  phone                text unique,
  name                 text,
  avatar_url           text,
  role                 text not null default 'member'
                       check (role in ('member', 'organizer')),
  mobile_money_number  text,
  -- Score de fiabilité 0-100. Calculé plus tard (Sprint 10) depuis l'historique.
  -- 100 par défaut = on fait confiance à un nouvel utilisateur au départ.
  reliability_score    integer not null default 100
                       check (reliability_score between 0 and 100),
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

comment on table public.profiles is
  'Profils utilisateurs — étend auth.users avec les données métier LikelembaApp';


-- ── TRIGGER : création automatique du profil à l'inscription ────────────────
-- Quand Supabase crée une ligne dans auth.users (après vérification OTP),
-- ce trigger crée automatiquement la ligne correspondante dans profiles.
-- Sans ce trigger, un utilisateur connecté n'aurait aucun profil → bugs partout.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, phone, name)
  values (
    new.id,
    new.email,  -- rempli pendant la phase Sprint 1-5 (auth email)
    new.phone,  -- restera vide jusqu'au Sprint 6+ (auth SMS), c'est normal
    null        -- le nom sera rempli au Sprint 2 (formulaire de profil)
  )
  on conflict (id) do nothing;  -- évite une erreur si le profil existe déjà
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE : GROUPS
-- Un groupe likelemba créé par un animateur (organizer).
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.groups (
  id                uuid primary key default uuid_generate_v4(),
  name              text not null,
  organizer_id      uuid not null references public.profiles(id) on delete cascade,
  cotisation_amount integer not null check (cotisation_amount > 0),  -- en CDF
  currency          text not null default 'CDF'
                    check (currency in ('CDF', 'USD')),
  frequency         text not null
                    check (frequency in ('weekly', 'biweekly', 'monthly')),
  start_date        date not null default current_date,
  total_turns       integer not null check (total_turns between 2 and 50),
  current_turn      integer not null default 1,
  status            text not null default 'active'
                    check (status in ('active', 'paused', 'completed')),
  description       text,
  -- Code court unique pour le lien d'invitation /join/[code]
  -- Généré automatiquement à la création (8 caractères aléatoires)
  invite_code       text unique not null default substr(md5(random()::text), 1, 8),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.groups is
  'Groupes likelemba — chaque groupe a un animateur et plusieurs membres';


-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE : GROUP_MEMBERS
-- Qui appartient à quel groupe, et dans quel ordre il reçoit la cagnotte.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.group_members (
  id          uuid primary key default uuid_generate_v4(),
  group_id    uuid not null references public.groups(id) on delete cascade,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  turn_order  integer not null,  -- 1 = reçoit la cagnotte au tour 1, etc.
  joined_at   timestamptz not null default now(),

  -- Un utilisateur ne peut pas rejoindre le même groupe deux fois
  unique(group_id, user_id),
  -- Deux membres ne peuvent pas avoir le même ordre de tour dans un groupe
  unique(group_id, turn_order)
);

comment on table public.group_members is
  'Appartenance aux groupes + ordre de réception de la cagnotte';


-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE : CONTRIBUTIONS
-- Chaque cotisation qu'un membre doit payer pour un tour donné.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.contributions (
  id              uuid primary key default uuid_generate_v4(),
  group_id        uuid not null references public.groups(id) on delete cascade,
  member_id       uuid not null references public.profiles(id) on delete cascade,
  turn_number     integer not null,
  amount          integer not null,  -- en CDF
  status          text not null default 'pending'
                  check (status in ('pending', 'paid', 'late')),
  paid_at         timestamptz,
  payment_method  text
                  check (payment_method in ('airtel_money', 'orange_money', 'cash', 'manual')),
  tx_ref          text,  -- référence transaction Mobile Money (Sprint 8-9)
  created_at      timestamptz not null default now()
);

comment on table public.contributions is
  'Cotisations dues par chaque membre à chaque tour';


-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE : PAYOUTS
-- Le versement de la cagnotte complète au membre dont c'est le tour.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.payouts (
  id            uuid primary key default uuid_generate_v4(),
  group_id      uuid not null references public.groups(id) on delete cascade,
  recipient_id  uuid not null references public.profiles(id) on delete cascade,
  turn_number   integer not null,
  amount        integer not null,  -- montant total de la cagnotte (CDF)
  status        text not null default 'pending'
                check (status in ('pending', 'paid')),
  paid_at       timestamptz,
  created_at    timestamptz not null default now()
);

comment on table public.payouts is
  'Versements de la cagnotte complète au gagnant de chaque tour';


-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE : REMINDERS
-- Historique des rappels WhatsApp/SMS envoyés (Sprint 6).
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.reminders (
  id          uuid primary key default uuid_generate_v4(),
  group_id    uuid not null references public.groups(id) on delete cascade,
  member_id   uuid not null references public.profiles(id) on delete cascade,
  channel     text not null check (channel in ('whatsapp', 'sms')),
  status      text not null default 'sent'
              check (status in ('sent', 'delivered', 'failed')),
  sent_at     timestamptz not null default now()
);

comment on table public.reminders is
  'Historique des rappels automatiques envoyés aux membres';


-- ═══════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
--
-- RÈGLE FONDAMENTALE : sans RLS activé, n'importe qui possédant la clé
-- publique "anon" (visible dans le code du navigateur) pourrait lire ou
-- modifier TOUTES les données de TOUS les utilisateurs.
--
-- RLS ajoute un filtre invisible directement dans PostgreSQL : chaque
-- requête est automatiquement restreinte selon l'utilisateur connecté
-- (auth.uid()), peu importe comment la requête est envoyée.
-- ═══════════════════════════════════════════════════════════════════════════

alter table public.profiles      enable row level security;
alter table public.groups        enable row level security;
alter table public.group_members enable row level security;
alter table public.contributions enable row level security;
alter table public.payouts       enable row level security;
alter table public.reminders     enable row level security;


-- ── Policies : PROFILES ──────────────────────────────────────────────────
-- Un utilisateur peut voir et modifier uniquement SON PROPRE profil.

create policy "profiles: voir le sien"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: modifier le sien"
  on public.profiles for update
  using (auth.uid() = id);


-- ── Policies : GROUPS ────────────────────────────────────────────────────
-- Un utilisateur voit un groupe s'il en est l'animateur OU s'il en est membre.

create policy "groups: voir ses groupes"
  on public.groups for select
  using (
    organizer_id = auth.uid()
    or exists (
      select 1 from public.group_members
      where group_id = groups.id and user_id = auth.uid()
    )
  );

create policy "groups: créer en tant qu'organisateur"
  on public.groups for insert
  with check (organizer_id = auth.uid());

create policy "groups: modifier si organisateur"
  on public.groups for update
  using (organizer_id = auth.uid());


-- ── Policies : GROUP_MEMBERS ─────────────────────────────────────────────
-- Visible par tous les membres du même groupe (pour voir qui fait partie du groupe).

create policy "group_members: voir les membres de son groupe"
  on public.group_members for select
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.group_members gm
      where gm.group_id = group_members.group_id and gm.user_id = auth.uid()
    )
  );

create policy "group_members: rejoindre un groupe"
  on public.group_members for insert
  with check (user_id = auth.uid());


-- ── Policies : CONTRIBUTIONS ─────────────────────────────────────────────
-- Visible par tous les membres du groupe concerné (transparence du likelemba).

create policy "contributions: voir dans son groupe"
  on public.contributions for select
  using (
    exists (
      select 1 from public.group_members
      where group_id = contributions.group_id and user_id = auth.uid()
    )
  );

create policy "contributions: créer la sienne"
  on public.contributions for insert
  with check (member_id = auth.uid());

create policy "contributions: organisateur peut modifier"
  on public.contributions for update
  using (
    exists (
      select 1 from public.groups
      where id = contributions.group_id and organizer_id = auth.uid()
    )
  );


-- ── Policies : PAYOUTS ───────────────────────────────────────────────────

create policy "payouts: voir dans son groupe"
  on public.payouts for select
  using (
    exists (
      select 1 from public.group_members
      where group_id = payouts.group_id and user_id = auth.uid()
    )
  );


-- ── Policies : REMINDERS ─────────────────────────────────────────────────

create policy "reminders: voir les siens"
  on public.reminders for select
  using (member_id = auth.uid());


-- ═══════════════════════════════════════════════════════════════════════════
-- INDEX — Accélèrent les requêtes les plus fréquentes
-- Sans index, PostgreSQL doit scanner toute la table à chaque requête.
-- Avec index, il trouve directement les lignes concernées.
-- ═══════════════════════════════════════════════════════════════════════════

create index if not exists idx_group_members_group  on public.group_members(group_id);
create index if not exists idx_group_members_user    on public.group_members(user_id);
create index if not exists idx_contributions_group   on public.contributions(group_id);
create index if not exists idx_contributions_member  on public.contributions(member_id);
create index if not exists idx_groups_organizer       on public.groups(organizer_id);
create index if not exists idx_groups_invite_code     on public.groups(invite_code);
create index if not exists idx_payouts_group          on public.payouts(group_id);
create index if not exists idx_reminders_group        on public.reminders(group_id);


-- ═══════════════════════════════════════════════════════════════════════════
-- FIN DU SCHÉMA SPRINT 1
-- Vérifie dans Supabase → Table Editor que les 6 tables sont bien créées :
-- profiles, groups, group_members, contributions, payouts, reminders
-- ═══════════════════════════════════════════════════════════════════════════