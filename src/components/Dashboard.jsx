import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI } from '../services/api.js';
import Logo from '../logo.svg';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, activityData] = await Promise.all([
          dashboardAPI.getStats(),
          dashboardAPI.getActivity(),
        ]);
        setStats(statsData);
        setActivities(activityData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setStats({ totalUsers: 1250, activeUsers: 890, totalProjects: 45, completedProjects: 32, pendingTasks: 18, completedTasks: 156 });
        setActivities([
          { id: '1', type: 'login', description: 'Successfully logged in', timestamp: new Date().toISOString(), status: 'success' },
          { id: '2', type: 'project_created', description: 'Created new project "Waste Management System"', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'info' },
          { id: '3', type: 'task_completed', description: 'Completed task "User Authentication Setup"', timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'success' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircleIcon color="success" />;
      case 'warning': return <WarningIcon color="warning" />;
      case 'info': return <InfoIcon color="info" />;
      default: return <InfoIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <img src={Logo} alt="ZeroWaste" style={{ width: 32, height: 32 }} />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ZeroWaste Dashboard
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen} sx={{ ml: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>{user?.name?.charAt(0) || 'U'}</Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}><PersonIcon sx={{ mr: 1 }} />Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}><SettingsIcon sx={{ mr: 1 }} />Settings</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}><LogoutIcon sx={{ mr: 1 }} />Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Here's what's happening with your account today.
        </Typography>

        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3} sx={{ mb: 4 }}>
          <Card><CardContent><Typography color="text.secondary" gutterBottom>Total Users</Typography><Typography variant="h4">{stats?.totalUsers?.toLocaleString?.() || stats?.totalUsers}</Typography><Typography variant="body2" color="text.secondary"><TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />+12% from last month</Typography></CardContent></Card>
          <Card><CardContent><Typography color="text.secondary" gutterBottom>Active Users</Typography><Typography variant="h4">{stats?.activeUsers?.toLocaleString?.() || stats?.activeUsers}</Typography><Typography variant="body2" color="text.secondary"><TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />+8% from last month</Typography></CardContent></Card>
          <Card><CardContent><Typography color="text.secondary" gutterBottom>Total Projects</Typography><Typography variant="h4">{stats?.totalProjects}</Typography><Typography variant="body2" color="text.secondary"><TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />+3 new this week</Typography></CardContent></Card>
          <Card><CardContent><Typography color="text.secondary" gutterBottom>Pending Tasks</Typography><Typography variant="h4">{stats?.pendingTasks}</Typography><Typography variant="body2" color="text.secondary"><WarningIcon sx={{ fontSize: 16, mr: 0.5 }} />{stats?.pendingTasks} tasks remaining</Typography></CardContent></Card>
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Recent Activity</Typography>
            <List>
              {activities.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem>
                    <ListItemIcon>{getStatusIcon(activity.status)}</ListItemIcon>
                    <ListItemText
                      primary={activity.description}
                      secondary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <CalendarIcon sx={{ fontSize: 16 }} />
                          {new Date(activity.timestamp).toLocaleString()}
                          <Chip label={activity.type.replace('_', ' ')} size="small" color={getStatusColor(activity.status)} variant="outlined" />
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < activities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button variant="contained" fullWidth startIcon={<PersonIcon />}>Create New User</Button>
              <Button variant="outlined" fullWidth startIcon={<DashboardIcon />}>Start New Project</Button>
              <Button variant="outlined" fullWidth startIcon={<SettingsIcon />}>System Settings</Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;

