-- Seed básico para crear un usuario administrador de ejemplo en PayTrack

INSERT INTO users (name, email, password, role, is_active, created_at)
VALUES ('Administrador PayTrack', 'admin@paytrack.local', '$2a$10$5Gs1eLChoA8gsINenM1sXeXPDPfJ1LDGGbNcIbLiy2iDv2Pz2QZf.', 'admin', 1, SYSUTCDATETIME());
