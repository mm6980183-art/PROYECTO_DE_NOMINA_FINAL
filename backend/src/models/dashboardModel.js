import db from '../config/db.js'

export const getSummaryMetrics = async () => {
  const employees = await db.query('SELECT COUNT(*) AS count FROM users WHERE role != \'admin\'')
  const payrolls = await db.query('SELECT COUNT(*) AS count, COALESCE(SUM(amount), 0) AS totalProcessed FROM payrolls')
  const deductions = await db.query('SELECT COALESCE(SUM(amount), 0) AS totalDeductions FROM deductions')
  const benefits = await db.query('SELECT COALESCE(SUM(amount), 0) AS totalBenefits FROM benefits')
  const activeUsers = await db.query('SELECT COUNT(*) AS count FROM users WHERE is_active = 1 AND role != \'admin\'')
  const attendance = await db.query('SELECT COUNT(*) AS totalEntries, COALESCE(AVG(CAST(attended AS FLOAT)), 0) AS attendanceRate FROM attendance')

  return {
    totalEmployees: employees[0]?.count || 0,
    payrollProcessed: payrolls[0]?.count || 0,
    totalPayrollAmount: Number(payrolls[0]?.totalProcessed || 0),
    totalDeductions: Number(deductions[0]?.totalDeductions || 0),
    totalBenefits: Number(benefits[0]?.totalBenefits || 0),
    activeUsers: activeUsers[0]?.count || 0,
    attendanceRate: Number(attendance[0]?.attendanceRate || 0) * 100
  }
}

export const getRecentReports = async () => {
  const rows = await db.query(
    'SELECT TOP 5 id, title, category, status, created_at AS createdAt FROM reports ORDER BY created_at DESC'
  )
  return rows
}

export const getSystemStats = async () => {
  const rows = await db.query(
    'SELECT module_name AS module, status, last_synced AS lastSynced FROM system_status ORDER BY module_name'
  )
  return rows
}

export const getPayrollTrend = async () => {
  const rows = await db.query(`
    SELECT 
      DATENAME(MONTH, processed_at) AS month,
      COUNT(*) AS count,
      COALESCE(SUM(amount), 0) AS total
    FROM payrolls
    GROUP BY DATENAME(MONTH, processed_at), MONTH(processed_at)
    ORDER BY MONTH(processed_at)
  `)
  return rows
}
