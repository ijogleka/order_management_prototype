CREATE ROLE compass WITH LOGIN;
CREATE DATABASE opg WITH OWNER compass;

\c opg compass;

CREATE TABLE IF NOT EXISTS users (
    id                SERIAL PRIMARY KEY,
    user_id           text UNIQUE,
    status            text
);

CREATE TABLE IF NOT EXISTS product_types (
    id                SERIAL PRIMARY KEY,
    product_type      text UNIQUE,
    status            text
);

CREATE TABLE IF NOT EXISTS vendors (
    id                SERIAL PRIMARY KEY,
    vendor_handle     text UNIQUE,
    status            text
);

CREATE TABLE IF NOT EXISTS product_type_vendor_mappings (
    id                SERIAL PRIMARY KEY,
    product_type_id   BIGINT,
    vendor_id         BIGINT,

    CONSTRAINT fk_product_type FOREIGN KEY(product_type_id) REFERENCES product_types(id),
    CONSTRAINT fk_vendor_1 FOREIGN KEY(vendor_id) REFERENCES vendors(id)
);

CREATE TABLE IF NOT EXISTS user_vendor_mappings (
    id                SERIAL PRIMARY KEY,
    user_id           BIGINT,
    vendor_id         BIGINT,

    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_vendor_2 FOREIGN KEY(vendor_id) REFERENCES vendors(id)
);

-- Some mock data for development purposes follows
INSERT INTO product_types (product_type, status) VALUES ('digital-ad', 'ACTIVE');

INSERT INTO vendors (vendor_handle, status) VALUES ('avatax', 'ACTIVE');
INSERT INTO vendors (vendor_handle, status) VALUES ('stripe', 'ACTIVE');
INSERT INTO vendors (vendor_handle, status) VALUES ('deesign', 'ACTIVE');

INSERT INTO product_type_vendor_mappings (product_type_id, vendor_id) VALUES (1, 1);
INSERT INTO product_type_vendor_mappings (product_type_id, vendor_id) VALUES (1, 2);
