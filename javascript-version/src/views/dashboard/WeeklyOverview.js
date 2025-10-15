// ** MUI Imports
import {
  Box,
  Card,
  Button,
  useTheme,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  Tooltip,
  CircularProgress,
  Grid
} from '@mui/material'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import GroupsIcon from '@mui/icons-material/Groups'

// ** Custom Components
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useState, useEffect } from 'react'

const GenderDistributionChart = () => {
  const theme = useTheme()
  const [chartData, setChartData] = useState({ male: [], female: [] })
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalStats, setTotalStats] = useState({ totalMale: 0, totalFemale: 0, total: 0 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9007/api/yearlyComp')
        if (!response.ok) throw new Error('Failed to fetch data')

        const result = await response.json()
        if (result.statusCode === 0 && result.data) {
          const apiCategories = result.data.map(item => item.customer)
          const maleData = result.data.map(item => item.male)
          const femaleData = result.data.map(item => item.female)
          const totalMale = maleData.reduce((sum, val) => sum + val, 0)
          const totalFemale = femaleData.reduce((sum, val) => sum + val, 0)

          setCategories(apiCategories)
          setChartData({ male: maleData, female: femaleData })
          setTotalStats({ totalMale, totalFemale, total: totalMale + totalFemale })
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      animations: { enabled: true, easing: 'easeinout', speed: 800 }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '50%',
        endingShape: 'rounded'
      }
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      markers: { width: 12, height: 12, radius: 6 }
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 4
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '13px',
          fontWeight: 500
        }
      }
    },
    yaxis: {
      title: {
        text: 'Number of People',
        style: {
          color: theme.palette.text.secondary,
          fontSize: '12px'
        }
      }
    }
  }

  const chartSeries = [
    { name: 'Male', data: chartData.male },
    { name: 'Female', data: chartData.female }
  ]

  const StatBox = ({ icon: Icon, value, label, color }) => (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        background: `${color}22`,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        boxShadow: 2,
        height: '100%'
      }}
    >
      <Icon sx={{ color, fontSize: 40 }} />
      <Box>
        <Typography variant='subtitle2' color='text.secondary'>
          {label}
        </Typography>
        <Typography variant='h6' fontWeight={600}>
          {value}
        </Typography>
      </Box>
    </Box>
  )

  if (isLoading)
    return (
      <Card
        sx={{
          p: 6,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 500,
          borderRadius: 3
        }}
      >
        <CircularProgress />
      </Card>
    )

  if (error)
    return (
      <Card
        sx={{
          p: 6,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 500
        }}
      >
        <Typography color='error' variant='h6'>
          Error: {error}
        </Typography>
      </Card>
    )

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 4,
        width: '100%',
        maxWidth: 1200,
        mx: 'auto'
      }}
    >
      <CardHeader
        title='Employee Strength As On Date'
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: '#fff',
          py: 3
        }}
        titleTypographyProps={{
          sx: { fontSize: '1.5rem', fontWeight: 700 }
        }}
        action={
          <Tooltip title='Options'>
            <IconButton sx={{ color: '#fff' }}>
              <DotsVertical />
            </IconButton>
          </Tooltip>
        }
      />

      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <StatBox
              icon={MaleIcon}
              value={totalStats.totalMale}
              label='Total Male'
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatBox
              icon={FemaleIcon}
              value={totalStats.totalFemale}
              label='Total Female'
              color={theme.palette.secondary.main}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatBox
              icon={GroupsIcon}
              value={totalStats.total}
              label='Total Employees'
              color={theme.palette.success.main}
            />
          </Grid>
        </Grid>

        <Box sx={{ height: 400 }}>
          <ReactApexcharts type='bar' height='100%' options={chartOptions} series={chartSeries} />
        </Box>

        <Box
          sx={{
            mt: 4,
            p: 3,
            bgcolor: 'background.default',
            borderRadius: 3,
            textAlign: 'center',
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, mb: 1 }}>
            Gender Distribution
          </Typography>
          <Typography variant='body1' sx={{ fontWeight: 500 }}>
            Male: {((totalStats.totalMale / totalStats.total) * 100).toFixed(1)}% | Female:{' '}
            {((totalStats.totalFemale / totalStats.total) * 100).toFixed(1)}%
          </Typography>
        </Box>

        <Button
          fullWidth
          variant='contained'
          sx={{
            mt: 4,
            py: 2,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            fontSize: '1rem',
            fontWeight: 600,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 4
            }
          }}
        >
          View Detailed Report
        </Button>
      </CardContent>
    </Card>
  )
}

export default GenderDistributionChart
