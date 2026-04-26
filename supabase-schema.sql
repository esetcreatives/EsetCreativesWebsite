-- ESET Creatives CMS Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects Table (Case Studies)
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    published BOOLEAN DEFAULT false,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    gallery TEXT[] NOT NULL DEFAULT '{}',
    youtube_id TEXT,
    metrics JSONB NOT NULL DEFAULT '{}',
    client_quote TEXT,
    client_name TEXT,
    client_role TEXT,
    meta_title TEXT,
    meta_desc TEXT
);

-- Contact Submissions Table (Leads)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id BIGSERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    role TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    site_title TEXT DEFAULT 'ESET Creatives | Creative Partner for CMOs',
    site_description TEXT DEFAULT 'E-commerce Growth Agency',
    contact_email TEXT DEFAULT 'esetcreatives@gmail.com',
    contact_phone TEXT DEFAULT '+251 98 244 5758',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default settings
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policies for projects
CREATE POLICY "Public can view published projects"
    ON projects FOR SELECT
    USING (published = true);

CREATE POLICY "Authenticated users can do everything with projects"
    ON projects FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Policies for contact_submissions
CREATE POLICY "Anyone can submit contact form"
    ON contact_submissions FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact submissions"
    ON contact_submissions FOR SELECT
    USING (auth.role() = 'authenticated');

-- Policies for site_settings
CREATE POLICY "Public can view site settings"
    ON site_settings FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can update site settings"
    ON site_settings FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Storage Bucket Creation (You may need to run this manually if you don't have superuser)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-assets', 'project-assets', true) 
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for project-assets
CREATE POLICY "Public Access to Project Assets" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'project-assets');

CREATE POLICY "Authenticated users can upload project assets" 
    ON storage.objects FOR INSERT 
    WITH CHECK (bucket_id = 'project-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update project assets" 
    ON storage.objects FOR UPDATE 
    WITH CHECK (bucket_id = 'project-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete project assets" 
    ON storage.objects FOR DELETE 
    USING (bucket_id = 'project-assets' AND auth.role() = 'authenticated');
