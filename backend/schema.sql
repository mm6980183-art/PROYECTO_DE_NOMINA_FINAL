-- PayTrack Backend schema para SQL Server

IF OBJECT_ID('users', 'U') IS NULL
CREATE TABLE users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name NVARCHAR(120) NOT NULL,
  email NVARCHAR(180) NOT NULL UNIQUE,
  password NVARCHAR(255) NOT NULL,
  role NVARCHAR(60) NOT NULL DEFAULT 'admin',
  is_active BIT NOT NULL DEFAULT 1,
  created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
)

IF OBJECT_ID('payrolls', 'U') IS NULL
CREATE TABLE payrolls (
  id INT IDENTITY(1,1) PRIMARY KEY,
  employee_id INT NOT NULL,
  amount DECIMAL(14,2) NOT NULL,
  processed_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT FK_payrolls_users FOREIGN KEY (employee_id) REFERENCES users(id)
)

IF OBJECT_ID('deductions', 'U') IS NULL
CREATE TABLE deductions (
  id INT IDENTITY(1,1) PRIMARY KEY,
  payroll_id INT NOT NULL,
  amount DECIMAL(14,2) NOT NULL,
  description NVARCHAR(255) NULL,
  CONSTRAINT FK_deductions_payrolls FOREIGN KEY (payroll_id) REFERENCES payrolls(id)
)

IF OBJECT_ID('benefits', 'U') IS NULL
CREATE TABLE benefits (
  id INT IDENTITY(1,1) PRIMARY KEY,
  payroll_id INT NOT NULL,
  amount DECIMAL(14,2) NOT NULL,
  description NVARCHAR(255) NULL,
  CONSTRAINT FK_benefits_payrolls FOREIGN KEY (payroll_id) REFERENCES payrolls(id)
)

IF OBJECT_ID('attendance', 'U') IS NULL
CREATE TABLE attendance (
  id INT IDENTITY(1,1) PRIMARY KEY,
  employee_id INT NOT NULL,
  date DATE NOT NULL,
  attended BIT NOT NULL DEFAULT 0,
  CONSTRAINT FK_attendance_users FOREIGN KEY (employee_id) REFERENCES users(id)
)

IF OBJECT_ID('reports', 'U') IS NULL
CREATE TABLE reports (
  id INT IDENTITY(1,1) PRIMARY KEY,
  title NVARCHAR(180) NOT NULL,
  category NVARCHAR(120) NOT NULL,
  status NVARCHAR(80) NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
)

IF OBJECT_ID('system_status', 'U') IS NULL
CREATE TABLE system_status (
  id INT IDENTITY(1,1) PRIMARY KEY,
  module_name NVARCHAR(120) NOT NULL,
  status NVARCHAR(80) NOT NULL DEFAULT 'operational',
  last_synced DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
)
