import { getConnection } from '../db/oracle.js'

export async function getYearlyComp(req, res) {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const d = new Date()
  const monthName = month[d.getMonth()]
  const yearName = d.getFullYear()
  const lastmonth = month[d.getMonth() - 1] || month[11]
  const currentDt = `${monthName} ${yearName}`
  const lstMnth = `${lastmonth} ${yearName}`

  const connection = await getConnection(res)
  if (!connection) return

  try {
    const sql = `
      SELECT A.COMPCODE, SUM(MALE) MALE, SUM(FEMALE) FEMALE, SUM(MALE)+SUM(FEMALE) TOTAL
      FROM (
        SELECT A.COMPCODE,
               CASE WHEN A.GENDER = 'MALE' THEN 1 ELSE 0 END MALE,
               CASE WHEN A.GENDER = 'FEMALE' THEN 1 ELSE 0 END FEMALE
        FROM MISTABLE A
        WHERE A.DOJ <= (
          SELECT MIN(AA.STDT) STDT FROM MONTHLYPAYFRQ AA WHERE AA.PAYPERIOD = '${currentDt}'
        )
        AND (A.DOL IS NULL OR A.DOL <= (
          SELECT MIN(AA.ENDT) STDT FROM MONTHLYPAYFRQ AA WHERE AA.PAYPERIOD = '${currentDt}'
        ))
      ) A
      GROUP BY A.COMPCODE
    `
    const result = await connection.execute(sql)
    const resp = result.rows.map(po => ({
      customer: po[0],
      male: po[1],
      female: po[2]
    }))

    return res.json({ statusCode: 0, data: resp })
  } catch (err) {
    console.error('Error retrieving data:', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  } finally {
    await connection.close()
  }
}
