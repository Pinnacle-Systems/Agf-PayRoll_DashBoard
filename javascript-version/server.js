import express from 'express'
import cors from 'cors'
import misDashboard from './src/routes/misDashboard.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', misDashboard)

const PORT = 9007
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
