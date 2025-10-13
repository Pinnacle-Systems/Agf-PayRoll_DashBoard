import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import Cash from 'mdi-material-ui/Cash'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import CalendarClock from 'mdi-material-ui/CalendarClock'
import FileDocument from 'mdi-material-ui/FileDocument'
import Calculator from 'mdi-material-ui/Calculator'
import Bank from 'mdi-material-ui/Bank'
import ChartBar from 'mdi-material-ui/ChartBar'
import Cog from 'mdi-material-ui/Cog'
import ShieldAccount from 'mdi-material-ui/ShieldAccount'
import ChevronRight from 'mdi-material-ui/ChevronRight'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import RocketLaunch from 'mdi-material-ui/RocketLaunch'
import BellRing from 'mdi-material-ui/BellRing'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'

const navigation = () => {
  return [
    // Quick Access Section
    {
      sectionTitle: 'Quick Access',
      sectionIcon: RocketLaunch,
      sectionBadge: 'Frequent'
    },
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/',
      badge: 'primary',
      badgeContent: 'New',
      featured: true
    },
    {
      title: 'Run Payroll',
      icon: Calculator,
      path: '/payroll/processing/run',
      shortcut: '⌘R',
      highlight: true
    },
    {
      title: 'Employee Management',
      icon: AccountGroup,
      path: '/payroll/employees',
      shortcut: '⌘E'
    },

    // Main Navigation
    {
      sectionTitle: 'Payroll Management',
      sectionIcon: ChartBar
    },
    {
      title: 'Payroll Dashboard',
      icon: ChartBar,
      path: '/payroll/dashboard',
      metrics: {
        label: 'This Month',
        value: '$245K',
        trend: 'up'
      }
    },
    {
      title: 'Employee Management',
      icon: AccountGroup,
      path: '/payroll/employees',
      children: [
        {
          title: 'All Employees',
          path: '/payroll/employees',
          badge: '42',
          badgeColor: 'info'
        },
        {
          title: 'Add Employee',
          path: '/payroll/employees/add',
          icon: AccountPlusOutline,
          highlight: true
        },
        {
          title: 'Employee Profiles',
          path: '/payroll/employees/profiles',
          divider: true
        },
        {
          title: 'Active Employees',
          path: '/payroll/employees/active',
          badge: '38'
        },
        {
          title: 'On Leave',
          path: '/payroll/employees/leave',
          badge: '4',
          badgeColor: 'warning'
        }
      ]
    },
    {
      title: 'Payroll Processing',
      icon: Calculator,
      path: '/payroll/processing',
      badge: '3',
      badgeColor: 'error',
      children: [
        {
          title: 'Run Payroll',
          path: '/payroll/processing/run',
          icon: RocketLaunch,
          featured: true
        },
        {
          title: 'Payroll History',
          path: '/payroll/processing/history',
          metrics: {
            label: 'Last Run',
            value: '2 days ago'
          }
        },
        {
          title: 'Pending Approvals',
          path: '/payroll/processing/pending',
          badge: '3',
          badgeColor: 'error'
        },
        {
          title: 'Scheduled Runs',
          path: '/payroll/processing/scheduled',
          badge: '2'
        }
      ]
    },
    {
      title: 'Time & Attendance',
      icon: CalendarClock,
      path: '/payroll/attendance',
      children: [
        {
          title: 'Time Tracking',
          path: '/payroll/attendance/tracking',
          badge: 'Live',
          badgeColor: 'success'
        },
        {
          title: 'Leave Management',
          path: '/payroll/attendance/leave',
          badge: '5 pending'
        },
        {
          title: 'Overtime',
          path: '/payroll/attendance/overtime',
          badge: '12 hrs'
        },
        {
          title: 'Attendance Reports',
          path: '/payroll/attendance/reports'
        }
      ]
    },
    {
      title: 'Compensation',
      icon: Cash,
      path: '/payroll/salary',
      children: [
        {
          title: 'Salary Structure',
          path: '/payroll/salary/structure',
          icon: Bank
        },
        {
          title: 'Benefits & Perks',
          path: '/payroll/salary/benefits',
          badge: '8 active'
        },
        {
          title: 'Deductions',
          path: '/payroll/salary/deductions',
          badge: '5 configured'
        },
        {
          title: 'Bonuses & Incentives',
          path: '/payroll/salary/bonuses',
          highlight: true
        },
        {
          title: 'Pay Grades',
          path: '/payroll/salary/grades'
        }
      ]
    },
    {
      title: 'Tax & Compliance',
      icon: ShieldAccount,
      path: '/payroll/tax',
      badge: 'Updated',
      badgeColor: 'success',
      children: [
        {
          title: 'Tax Calculations',
          path: '/payroll/tax/calculations',
          metrics: {
            label: 'This Quarter',
            value: '$45.2K'
          }
        },
        {
          title: 'Tax Forms',
          path: '/payroll/tax/forms',
          badge: 'W-2 Ready'
        },
        {
          title: 'Compliance Reports',
          path: '/payroll/tax/compliance'
        },
        {
          title: 'Filing Deadlines',
          path: '/payroll/tax/deadlines',
          badge: '2 upcoming'
        }
      ]
    },
    {
      title: 'Payments',
      icon: Bank,
      path: '/payroll/payments',
      children: [
        {
          title: 'Payment Methods',
          path: '/payroll/payments/methods',
          badge: '3 configured'
        },
        {
          title: 'Payment History',
          path: '/payroll/payments/history',
          metrics: {
            label: 'Last Payment',
            value: '$84.5K'
          }
        },
        {
          title: 'Bank Transfers',
          path: '/payroll/payments/transfers'
        },
        {
          title: 'Payment Schedule',
          path: '/payroll/payments/schedule'
        }
      ]
    },
    {
      title: 'Reports & Analytics',
      icon: FileDocument,
      path: '/payroll/reports',
      children: [
        {
          title: 'Payroll Summary',
          path: '/payroll/reports/summary',
          icon: ChartBar
        },
        {
          title: 'Tax Reports',
          path: '/payroll/reports/tax'
        },
        {
          title: 'Employee Reports',
          path: '/payroll/reports/employee'
        },
        {
          title: 'Custom Reports',
          path: '/payroll/reports/custom',
          highlight: true
        },
        {
          title: 'Export Data',
          path: '/payroll/reports/export',
          icon: FileDocument
        }
      ]
    },

    // System & Settings
    {
      sectionTitle: 'Administration',
      sectionIcon: Cog
    },
    {
      title: 'System Settings',
      icon: Cog,
      path: '/payroll/settings',
      children: [
        {
          title: 'Company Profile',
          path: '/payroll/settings/company',
          icon: AccountGroup
        },
        {
          title: 'Payroll Cycles',
          path: '/payroll/settings/cycles',
          badge: 'Bi-weekly'
        },
        {
          title: 'Tax Configuration',
          path: '/payroll/settings/tax',
          icon: ShieldAccount
        },
        {
          title: 'User Permissions',
          path: '/payroll/settings/permissions',
          badge: '8 users'
        },
        {
          title: 'Integration',
          path: '/payroll/settings/integration',
          badge: '3 connected'
        },
        {
          title: 'Backup & Security',
          path: '/payroll/settings/security'
        }
      ]
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings',
      quickAccess: true
    },

    // Support & Resources
    {
      sectionTitle: 'Support',
      sectionIcon: HelpCircleOutline
    },
    {
      title: 'Notifications',
      icon: BellRing,
      path: '/notifications',
      badge: '5',
      badgeColor: 'error'
    },
    {
      title: 'Help & Documentation',
      icon: HelpCircleOutline,
      path: '/help',
      openInNewTab: true
    },
    {
      title: 'Feedback',
      icon: AlertCircleOutline,
      path: '/feedback'
    },

    // Authentication (usually hidden when logged in)
    {
      sectionTitle: 'Authentication',
      sectionIcon: ShieldAccount,
      hideWhenAuthenticated: true
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true,
      guestOnly: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true,
      guestOnly: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    }
  ]
}

// Additional utility functions for enhanced navigation
export const navigationUtils = {
  getFeaturedItems: () => navigation().filter(item => item.featured),
  getQuickAccess: () => navigation().filter(item => item.quickAccess),
  getItemsWithBadges: () => navigation().filter(item => item.badge),
  flattenNavigation: (navItems = navigation()) => {
    const flatItems = []
    navItems.forEach(item => {
      if (item.children) {
        flatItems.push(...navigationUtils.flattenNavigation(item.children))
      } else if (item.path) {
        flatItems.push(item)
      }
    })
    return flatItems
  }
}

export default navigation
