import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Link,
  Container,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardMedia,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' }, gap: 4, alignItems: 'stretch' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <img src="/wastezero-logo.svg" alt="ZeroWaste" style={{ width: 24, height: 24, marginRight: 8 }} />
            <Typography variant="h6">WasteZero</Typography>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Join the Recycling Revolution
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
            WasteZero connects volunteers, NGOs, and administrators to schedule pickups, manage recycling opportunities, and make a positive impact on our environment.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3 }}>
            <Box>
              <Card elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                <CardMedia component="img" height="140" image="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop" alt="Schedule Pickups" />
              </Card>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Schedule Pickups</Typography>
              <Typography variant="body2" color="text.secondary">Easily arrange waste collection.</Typography>
            </Box>
            <Box>
              <Card elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                <CardMedia component="img" height="140" image="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop" alt="Track Impact" />
              </Card>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Track Impact</Typography>
              <Typography variant="body2" color="text.secondary">Monitor your environmental contribution.</Typography>
            </Box>
            <Box>
              <Card elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                <CardMedia component="img" height="140" image="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=1200&auto=format&fit=crop" alt="Volunteer" />
              </Card>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Volunteer</Typography>
              <Typography variant="body2" color="text.secondary">Join recycling initiatives.</Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Tabs
              value={0}
              onChange={(_, v) => { if (v === 1) navigate('/register'); }}
              variant="fullWidth"
              sx={{ mb: 2 }}
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>

            <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
              Login to your account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Link component={RouterLink} to="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
