// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import GenderMale from 'mdi-material-ui/GenderMale'
import GenderFemale from 'mdi-material-ui/GenderFemale'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useState, useEffect } from 'react'

const GenderDistributionChart = () => {
  // ** Hook
  const theme = useTheme()

  // ** State
  const [chartData, setChartData] = useState({ male: [], female: [] })
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalStats, setTotalStats] = useState({ totalMale: 0, totalFemale: 0, total: 0 })

  // ** Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('https://mtc.pinnaclesystems.co.in/misDashboard/yearlyComp')

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const result = await response.json()

        if (result.statusCode === 0 && result.data) {
          const apiCategories = result.data.map(item => item.customer)
          const maleData = result.data.map(item => item.male)
          const femaleData = result.data.map(item => item.female)

          // Calculate totals
          const totalMale = maleData.reduce((sum, val) => sum + val, 0)
          const totalFemale = femaleData.reduce((sum, val) => sum + val, 0)
          const total = totalMale + totalFemale

          setCategories(apiCategories)
          setChartData({ male: maleData, female: femaleData })
          setTotalStats({ totalMale, totalFemale, total })
        } else {
          throw new Error('Invalid data format')
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const options = {
    chart: {
      type: 'bar',
      parentHeightOffset: 0,
      toolbar: { show: false },
      stacked: false,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '45%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: ['transparent']
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      markers: {
        width: 12,
        height: 12,
        radius: 6
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 4,
      padding: {
        top: 10,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    states: {
      hover: {
        filter: { type: 'lighten', value: 0.05 }
      }
    },
    xaxis: {
      categories: categories,
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      },
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
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '11px'
        },
        formatter: value => (Math.round(value) === value ? value : '')
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: theme.palette.mode,
      style: {
        fontSize: '14px'
      },
      y: {
        formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
          const customer = w.globals.categoryLabels[dataPointIndex]
          const male = series[0][dataPointIndex]
          const female = series[1][dataPointIndex]
          const total = male + female
          const malePercent = ((male / total) * 100).toFixed(1)
          const femalePercent = ((female / total) * 100).toFixed(1)

          return `
            <div style="padding: 5px 0;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <strong>${customer}</strong>
                <span style="margin-left: 20px; font-weight: 600;">Total: ${total}</span>
              </div>
              <div style="display: flex; align-items: center; margin: 4px 0;">
                <span style="color: ${theme.palette.primary.main}; margin-right: 8px;">●</span>
                Male: ${male} (${malePercent}%)
              </div>
              <div style="display: flex; align-items: center; margin: 4px 0;">
                <span style="color: ${theme.palette.secondary.main}; margin-right: 8px;">●</span>
                Female: ${female} (${femalePercent}%)
              </div>
            </div>
          `
        }
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            horizontalAlign: 'center'
          }
        }
      }
    ]
  }

  const series = [
    {
      name: 'Male',
      data: chartData.male
    },
    {
      name: 'Female',
      data: chartData.female
    }
  ]

  if (isLoading) {
    return (
      <Card>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <Typography variant='h6' color='text.secondary'>
            Loading gender distribution data...
          </Typography>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <Typography color='error' variant='h6'>
            Error: {error}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        title='Employee Strength As On Date'
        titleTypographyProps={{
          sx: {
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important',
            fontSize: '1.25rem !important',
            fontWeight: 600
          }
        }}
        action={
          <Tooltip title='View options'>
            <IconButton size='small' aria-label='settings' sx={{ color: 'text.secondary' }}>
              <DotsVertical />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        {/* Summary Stats */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            mb: 4,
            p: 3,
            bgcolor: 'action.hover',
            borderRadius: 2
          }}
        ></Box>

        {/* Chart */}
        <Box sx={{ '& .apexcharts-tooltip': { boxShadow: theme.shadows[3] } }}>
          <ReactApexcharts type='bar' height={320} options={options} series={series} />
        </Box>

        {/* Gender Ratio */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant='body2' sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Gender Ratio: {((totalStats.totalMale / totalStats.total) * 100).toFixed(1)}% Male •
            {((totalStats.totalFemale / totalStats.total) * 100).toFixed(1)}% Female
          </Typography>
        </Box>

        <Button fullWidth variant='contained' sx={{ mt: 3 }}>
          View Detailed Report
        </Button>
      </CardContent>
    </Card>
  )
}

export default GenderDistributionChart
