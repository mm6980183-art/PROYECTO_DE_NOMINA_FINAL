-- Seed para PayTrack con datos de prueba realistas

-- Usuarios/Empleados
INSERT INTO users (name, email, password, role, is_active, created_at)
VALUES 
  ('Administrador PayTrack', 'admin@paytrack.local', '$2a$10$cnIZ/XUfVcuoawFxiJPEw.jCs1l9cuK/It7D/Tt6MLG1LQMUf1Y9y', 'admin', 1, SYSUTCDATETIME()),
  ('Juan Pérez', 'juan.perez@empresa.com', '$2a$10$cnIZ/XUfVcuoawFxiJPEw.jCs1l9cuK/It7D/Tt6MLG1LQMUf1Y9y', 'employee', 1, DATEADD(MONTH, -3, SYSUTCDATETIME())),
  ('María García', 'maria.garcia@empresa.com', '$2a$10$cnIZ/XUfVcuoawFxiJPEw.jCs1l9cuK/It7D/Tt6MLG1LQMUf1Y9y', 'employee', 1, DATEADD(MONTH, -2, SYSUTCDATETIME())),
  ('Carlos López', 'carlos.lopez@empresa.com', '$2a$10$cnIZ/XUfVcuoawFxiJPEw.jCs1l9cuK/It7D/Tt6MLG1LQMUf1Y9y', 'employee', 1, DATEADD(MONTH, -1, SYSUTCDATETIME())),
  ('Ana Martínez', 'ana.martinez@empresa.com', '$2a$10$cnIZ/XUfVcuoawFxiJPEw.jCs1l9cuK/It7D/Tt6MLG1LQMUf1Y9y', 'employee', 1, SYSUTCDATETIME()),
  ('Roberto Sánchez', 'roberto.sanchez@empresa.com', '$2a$10$cnIZ/XUfVcuoawFxiJPEw.jCs1l9cuK/It7D/Tt6MLG1LQMUf1Y9y', 'employee', 1, DATEADD(DAY, -15, SYSUTCDATETIME()));

-- Nóminas procesadas
INSERT INTO payrolls (employee_id, amount, processed_at)
VALUES 
  (2, 2500000, DATEADD(MONTH, -5, SYSUTCDATETIME())),
  (3, 2300000, DATEADD(MONTH, -5, SYSUTCDATETIME())),
  (4, 2700000, DATEADD(MONTH, -5, SYSUTCDATETIME())),
  (5, 2400000, DATEADD(MONTH, -5, SYSUTCDATETIME())),
  (6, 2600000, DATEADD(MONTH, -5, SYSUTCDATETIME())),
  (2, 2500000, DATEADD(MONTH, -4, SYSUTCDATETIME())),
  (3, 2300000, DATEADD(MONTH, -4, SYSUTCDATETIME())),
  (4, 2700000, DATEADD(MONTH, -4, SYSUTCDATETIME())),
  (5, 2400000, DATEADD(MONTH, -4, SYSUTCDATETIME())),
  (6, 2600000, DATEADD(MONTH, -4, SYSUTCDATETIME())),
  (2, 2500000, DATEADD(MONTH, -3, SYSUTCDATETIME())),
  (3, 2300000, DATEADD(MONTH, -3, SYSUTCDATETIME())),
  (4, 2700000, DATEADD(MONTH, -3, SYSUTCDATETIME())),
  (5, 2400000, DATEADD(MONTH, -3, SYSUTCDATETIME())),
  (6, 2600000, DATEADD(MONTH, -3, SYSUTCDATETIME())),
  (2, 2500000, DATEADD(MONTH, -2, SYSUTCDATETIME())),
  (3, 2300000, DATEADD(MONTH, -2, SYSUTCDATETIME())),
  (4, 2700000, DATEADD(MONTH, -2, SYSUTCDATETIME())),
  (5, 2400000, DATEADD(MONTH, -2, SYSUTCDATETIME())),
  (6, 2600000, DATEADD(MONTH, -2, SYSUTCDATETIME())),
  (2, 2500000, DATEADD(MONTH, -1, SYSUTCDATETIME())),
  (3, 2300000, DATEADD(MONTH, -1, SYSUTCDATETIME())),
  (4, 2700000, DATEADD(MONTH, -1, SYSUTCDATETIME())),
  (5, 2400000, DATEADD(MONTH, -1, SYSUTCDATETIME())),
  (6, 2600000, DATEADD(MONTH, -1, SYSUTCDATETIME()));

-- Deducciones
INSERT INTO deductions (payroll_id, amount, description)
VALUES 
  (1, 150000, 'Descuento por falta'),
  (1, 100000, 'Aporte pensión'),
  (2, 115000, 'Aporte pensión'),
  (3, 135000, 'Aporte pensión'),
  (4, 120000, 'Aporte pensión'),
  (5, 130000, 'Aporte pensión'),
  (6, 150000, 'Descuento por falta'),
  (7, 115000, 'Aporte pensión'),
  (8, 135000, 'Aporte pensión'),
  (9, 120000, 'Aporte pensión'),
  (10, 130000, 'Aporte pensión'),
  (11, 150000, 'Descuento por falta'),
  (12, 115000, 'Aporte pensión'),
  (13, 135000, 'Aporte pensión'),
  (14, 120000, 'Aporte pensión'),
  (15, 130000, 'Aporte pensión'),
  (16, 150000, 'Descuento por falta'),
  (17, 115000, 'Aporte pensión'),
  (18, 135000, 'Aporte pensión'),
  (19, 120000, 'Aporte pensión'),
  (20, 130000, 'Aporte pensión'),
  (21, 150000, 'Descuento por falta'),
  (22, 115000, 'Aporte pensión'),
  (23, 135000, 'Aporte pensión'),
  (24, 120000, 'Aporte pensión'),
  (25, 130000, 'Aporte pensión');

-- Prestaciones sociales
INSERT INTO benefits (payroll_id, amount, description)
VALUES 
  (1, 208333, 'Prima de servicios'),
  (2, 191667, 'Prima de servicios'),
  (3, 225000, 'Prima de servicios'),
  (4, 200000, 'Prima de servicios'),
  (5, 216667, 'Prima de servicios'),
  (6, 208333, 'Prima de servicios'),
  (7, 191667, 'Prima de servicios'),
  (8, 225000, 'Prima de servicios'),
  (9, 200000, 'Prima de servicios'),
  (10, 216667, 'Prima de servicios'),
  (11, 208333, 'Prima de servicios'),
  (12, 191667, 'Prima de servicios'),
  (13, 225000, 'Prima de servicios'),
  (14, 200000, 'Prima de servicios'),
  (15, 216667, 'Prima de servicios'),
  (16, 208333, 'Prima de servicios'),
  (17, 191667, 'Prima de servicios'),
  (18, 225000, 'Prima de servicios'),
  (19, 200000, 'Prima de servicios'),
  (20, 216667, 'Prima de servicios'),
  (21, 208333, 'Prima de servicios'),
  (22, 191667, 'Prima de servicios'),
  (23, 225000, 'Prima de servicios'),
  (24, 200000, 'Prima de servicios'),
  (25, 216667, 'Prima de servicios');

-- Asistencia
INSERT INTO attendance (employee_id, date, attended)
VALUES 
  (2, DATEADD(DAY, -30, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (2, DATEADD(DAY, -29, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (2, DATEADD(DAY, -28, CAST(SYSUTCDATETIME() AS DATE)), 0),
  (2, DATEADD(DAY, -27, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (2, DATEADD(DAY, -26, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (3, DATEADD(DAY, -30, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (3, DATEADD(DAY, -29, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (3, DATEADD(DAY, -28, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (3, DATEADD(DAY, -27, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (3, DATEADD(DAY, -26, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (4, DATEADD(DAY, -30, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (4, DATEADD(DAY, -29, CAST(SYSUTCDATETIME() AS DATE)), 0),
  (4, DATEADD(DAY, -28, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (4, DATEADD(DAY, -27, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (4, DATEADD(DAY, -26, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (5, DATEADD(DAY, -30, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (5, DATEADD(DAY, -29, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (5, DATEADD(DAY, -28, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (5, DATEADD(DAY, -27, CAST(SYSUTCDATETIME() AS DATE)), 0),
  (5, DATEADD(DAY, -26, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (6, DATEADD(DAY, -30, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (6, DATEADD(DAY, -29, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (6, DATEADD(DAY, -28, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (6, DATEADD(DAY, -27, CAST(SYSUTCDATETIME() AS DATE)), 1),
  (6, DATEADD(DAY, -26, CAST(SYSUTCDATETIME() AS DATE)), 1);

-- Reportes
INSERT INTO reports (title, category, status, created_at)
VALUES 
  ('Nómina Enero 2026', 'Payroll', 'Completed', DATEADD(MONTH, -5, SYSUTCDATETIME())),
  ('Nómina Febrero 2026', 'Payroll', 'Completed', DATEADD(MONTH, -4, SYSUTCDATETIME())),
  ('Nómina Marzo 2026', 'Payroll', 'Completed', DATEADD(MONTH, -3, SYSUTCDATETIME())),
  ('Reporte de Asistencia Marzo', 'Attendance', 'Completed', DATEADD(MONTH, -3, SYSUTCDATETIME())),
  ('Nómina Abril 2026', 'Payroll', 'Completed', DATEADD(MONTH, -2, SYSUTCDATETIME())),
  ('Nómina Mayo 2026', 'Payroll', 'In Progress', DATEADD(MONTH, -1, SYSUTCDATETIME())),
  ('Reporte de Deducciones Mayo', 'Deductions', 'In Progress', DATEADD(DAY, -5, SYSUTCDATETIME()));

-- Estado del sistema
INSERT INTO system_status (module_name, status, last_synced)
VALUES 
  ('Payroll', 'operational', DATEADD(HOUR, -1, SYSUTCDATETIME())),
  ('Users', 'operational', SYSUTCDATETIME()),
  ('Attendance', 'operational', DATEADD(HOUR, -2, SYSUTCDATETIME())),
  ('Reports', 'operational', DATEADD(HOUR, -3, SYSUTCDATETIME())),
  ('Dashboard', 'operational', SYSUTCDATETIME());
