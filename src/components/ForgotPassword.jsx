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
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// Use public asset to ensure consistent availability

const steps = ['Enter Email', 'Verify OTP', 'Reset Password'];

const ForgotPassword = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!email) {
        setError('Please enter your email address');
        return;
      }
      try {
        setIsLoading(true);
        setError('');
        await forgotPassword(email);
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
    } else if (activeStep === 1) {
      if (!otp) {
        setError('Please enter the OTP');
        return;
      }
      setActiveStep(2);
    }
  };

  const handleBack = () => setActiveStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeStep !== 2) return;
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    try {
      setIsLoading(true);
      setError('');
      await resetPassword(email, otp, newPassword);
      setSuccess('Password reset successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setIsLoading(true);
      setError('');
      await forgotPassword(email);
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
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Box sx={{ mb: 2 }}>
            <img src="/wastezero-logo.svg" alt="ZeroWaste" style={{ width: 64, height: 64 }} />
          </Box>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Reset Password
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
            {activeStep === 0 && (
              <>
                <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                  Enter your email address and we'll send you a verification code to reset your password.
                </Typography>
                <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} type="email" sx={{ mb: 3 }} />
                <Button fullWidth variant="contained" onClick={handleNext} disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
                  {isLoading ? <CircularProgress size={24} /> : 'Send OTP'}
                </Button>
              </>
            )}

            {activeStep === 1 && (
              <>
                <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                  We've sent a verification code to <strong>{email}</strong>
                </Typography>
                <TextField margin="normal" required fullWidth id="otp" label="Enter OTP" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} sx={{ mb: 3 }} inputProps={{ maxLength: 6 }} />
                <Button fullWidth variant="contained" onClick={handleNext} disabled={isLoading || !otp} sx={{ mt: 3, mb: 2 }}>
                  Verify OTP
                </Button>
                <Button fullWidth variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>
                  Back
                </Button>
                <Button fullWidth variant="text" onClick={resendOTP} disabled={isLoading} sx={{ mb: 2 }}>
                  Resend OTP
                </Button>
              </>
            )}

            {activeStep === 2 && (
              <>
                <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                  Enter your new password
                </Typography>
                <TextField margin="normal" required fullWidth name="newPassword" label="New Password" type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} sx={{ mb: 2 }} />
                <TextField margin="normal" required fullWidth name="confirmPassword" label="Confirm New Password" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={{ mb: 3 }} />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
                  {isLoading ? <CircularProgress size={24} /> : 'Reset Password'}
                </Button>
                <Button fullWidth variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>
                  Back
                </Button>
              </>
            )}
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">
                Remember your password?{' '}
                <Link component={RouterLink} to="/login">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;

