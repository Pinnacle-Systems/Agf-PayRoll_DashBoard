import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const oracledb = require('oracledb')

oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_19_20' })

const dbConfig = {
  user: 'PSSPAYROLL',
  password: 'PSSPAYROLL_OCT2024',
  connectString: '103.125.155.220:1555/AN01P'
}

export async function getConnection(res) {
  let connection
  try {
    connection = await oracledb.getConnection(dbConfig)
    console.log('✅ OracleDB Connection Successful!')
    return connection
  } catch (err) {
    console.error('❌ OracleDB Connection Failed:', err.message)
    if (res) {
      return res.json({ statusCode: 1, message: 'Database Connection Failed' })
    }
  }
}
