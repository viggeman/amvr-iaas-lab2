CREATE TABLE address (
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	country VARCHAR(50) NOT NULL,
	city VARCHAR(50) NOT NULL,
	street VARCHAR(100) NOT NULL,
	street_number INT NOT NULL,
	postal_code INT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE app_user (
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email_address VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(50) UNIQUE NOT NULL,
	date_of_birth DATE NOT NULL,
	address uuid,
	FOREIGN KEY(address) REFERENCES address(id) ON DELETE CASCADE,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post (
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	content TEXT NOT NULL,
	app_user_id uuid,
	FOREIGN KEY(app_user_id) REFERENCES app_user(id) ON DELETE CASCADE,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comment (
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	content TEXT NOT NULL,
	app_user_id uuid,
	post_id uuid,
	FOREIGN KEY(app_user_id) REFERENCES app_user(id) ON DELETE CASCADE,
	FOREIGN KEY(post_id) REFERENCES post(id) ON DELETE CASCADE,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_modified_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_at = current_timestamp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Loop through all tables and add triggers
DO $$
DECLARE
    table_record RECORD;
BEGIN
    FOR table_record IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public' -- Adjust schema if needed
    LOOP
        EXECUTE format('CREATE TRIGGER %I_modified_at_trigger
                       BEFORE UPDATE ON %I
                       FOR EACH ROW
                       EXECUTE FUNCTION update_modified_at();', table_record.tablename, table_record.tablename);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- /* Remember to change the UUID's to what you have your database */
INSERT INTO address (country, city, street, street_number, postal_code)
VALUES ('Sweden', 'Gothenburg', 'Drottninggatan', 28, 41340);

INSERT INTO app_user (role, first_name, last_name, email_address, password, date_of_birth)
VALUES ('admin', 'George', 'Clooney', 'test@test.com', 'secret', '1968-04-21');

INSERT INTO app_user (role, first_name, last_name, email_address, password, date_of_birth)
VALUES ('user', 'Martin', 'Berg', 'test2@test.com', 'secret2', '1995-04-21');
