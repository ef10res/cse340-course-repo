-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

SELECT * FROM organization;

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
	organization_id INTEGER 
        REFERENCES organization(organization_id),
	title VARCHAR(255) NOT NULL,
	description TEXT,
	location VARCHAR(255) NOT NULL,
	project_date DATE NOT NULL
);

ALTER TABLE service_project
ALTER COLUMN organization_id SET NOT NULL;

ALTER TABLE service_project
ALTER COLUMN description SET NOT NULL;

-- =========================
-- ORGANIZATION 1 (5 projects)
-- =========================
INSERT INTO service_project (organization_id, title, description, location, project_date)
VALUES
(1, 'Community Clean-Up Drive', 'Cleaning local parks and streets', 'Salt Lake City', '2026-03-10'),
(1, 'Food Bank Support', 'Sorting and distributing food donations', 'Downtown Center', '2026-03-15'),
(1, 'Tree Planting Initiative', 'Planting trees in urban areas', 'City Park', '2026-04-01'),
(1, 'Homeless Shelter Help', 'Assisting staff at shelters', 'Shelter A', '2026-04-10'),
(1, 'School Supply Donation', 'Collecting and distributing school supplies', 'Community Center', '2026-04-20');


-- =========================
-- ORGANIZATION 2 (5 projects)
-- =========================
INSERT INTO service_project (organization_id, title, description, location, project_date)
VALUES
(2, 'Beach Cleanup Program', 'Removing trash from beaches', 'Santa Monica Beach', '2026-03-12'),
(2, 'Senior Assistance Program', 'Helping seniors with daily tasks', 'Senior Center', '2026-03-18'),
(2, 'Recycling Awareness Campaign', 'Educating public about recycling', 'City Hall', '2026-04-05'),
(2, 'Community Garden Build', 'Building shared gardens', 'Westside Lot', '2026-04-12'),
(2, 'Tech for Kids Workshop', 'Teaching basic coding to kids', 'Library Branch', '2026-04-25');


-- =========================
-- ORGANIZATION 3 (5 projects)
-- =========================
INSERT INTO service_project (organization_id, title, description, location, project_date)
VALUES
(3, 'Health Awareness Fair', 'Free health screenings and education', 'Community Hospital', '2026-03-14'),
(3, 'Blood Donation Drive', 'Organizing blood donations', 'University Hall', '2026-03-22'),
(3, 'Youth Mentorship Program', 'Mentoring high school students', 'High School Campus', '2026-04-03'),
(3, 'Disaster Relief Prep', 'Preparing emergency kits', 'Fire Station', '2026-04-15'),
(3, 'Mental Health Workshop', 'Stress management and awareness', 'Community Center', '2026-04-28');

ALTER TABLE service_project
ADD CONSTRAINT fk_service_project_organization
FOREIGN KEY (organization_id)
REFERENCES organization(organization_id);

SELECT * FROM service_project