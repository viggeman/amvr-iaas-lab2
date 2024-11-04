CREATE TABLE addresses (
	id serial PRIMARY KEY,
	country VARCHAR(50) NOT NULL,
	city VARCHAR(50) NOT NULL,
	street VARCHAR(100) NOT NULL,
	street_number INT NOT NULL,
	postal_code INT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE app_user (
	id serial PRIMARY KEY,
	role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('app_user', 'admin')),
	name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email_address VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(50) UNIQUE NOT NULL,
	date_of_birth DATE NOT NULL,
	address INT,
	FOREIGN KEY(address) REFERENCES addresses(id),
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post (
	id serial PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	content TEXT NOT NULL,
	app_user_id INT,
	FOREIGN KEY(app_user_id) REFERENCES app_user(id),
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comment (
	id serial PRIMARY KEY,
	content TEXT NOT NULL,
	app_user_id INT,
	post_id INT,
	FOREIGN KEY(app_user_id) REFERENCES app_user(id),
	FOREIGN KEY(post_id) REFERENCES post(id),
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

INSERT INTO addresses VALUES (1, 'Sweden', 'Gothenburg', 'Drottninggatan', 28, 41340);

INSERT INTO app_user VALUES (1, 'admin', 'George', 'Clooney', 'test9@test.com', 'pwd', '1995-04-21', 1);

INSERT INTO post VALUES (1, 'About dogs', 'Dogs bark and have four legs. Dogs like food.', 1);
INSERT INTO comment VALUES (1, 'Nice post about dogs! Very informative.', 1, 1);
