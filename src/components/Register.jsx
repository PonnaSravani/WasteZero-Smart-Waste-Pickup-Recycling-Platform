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
  Stepper,
  Step,
  StepLabel,
  Tabs,
  Tab,
  Card,
  CardMedia,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const steps = ['Account Details', 'Email Verification'];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, sendOTP, verifyOTP } = useAuth();
  const navigate = useNavigate();

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
      try {
        setIsLoading(true);
        setError('');
        await sendOTP(email);
        setSuccess('OTP sent to your email. Please check and enter the code.');
        setActiveStep(1);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Failed to send OTP. Please try again.';
        setError(errorMessage);
        if (err.response?.status === 429) {
          setError('Please wait a moment before requesting another OTP. ' + errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => setActiveStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeStep !== 1) return;
    try {
      setIsLoading(true);
      setError('');
      await verifyOTP(email, otp);
      await register(name, email, password);
      setSuccess('Registration successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setIsLoading(true);
      setError('');
      await sendOTP(email);
      setSuccess('OTP resent successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to resend OTP. Please try again.';
      setError(errorMessage);
      if (err.response?.status === 429) {
        setError('Please wait a moment before requesting another OTP. ' + errorMessage);
      }
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
              value={1}
              onChange={(_, v) => { if (v === 0) navigate('/login'); }}
              variant="fullWidth"
              sx={{ mb: 2 }}
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
            <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
              Create your account
            </Typography>

            <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                {success}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              {activeStep === 0 ? (
                <>
                  <TextField margin="normal" required fullWidth id="name" label="Full Name" name="name" autoComplete="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
                  <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" sx={{ mb: 2 }} />
                  <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
                  <TextField margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={{ mb: 3 }} />
                  <Button fullWidth variant="contained" onClick={handleNext} disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
                    {isLoading ? <CircularProgress size={24} /> : 'Next'}
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                    We've sent a verification code to <strong>{email}</strong>
                  </Typography>
                  <TextField margin="normal" required fullWidth id="otp" label="Enter OTP" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} sx={{ mb: 2 }} inputProps={{ maxLength: 6 }} />
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading || !otp}>
                    {isLoading ? <CircularProgress size={24} /> : 'Create Account'}
                  </Button>
                  <Button fullWidth variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>
                    Back
                  </Button>
                  <Button fullWidth variant="text" onClick={resendOTP} disabled={isLoading} sx={{ mb: 2 }}>
                    Resend OTP
                  </Button>
                </>
              )}
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login">
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;


