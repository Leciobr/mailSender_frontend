import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import apiClient from '../utils/api';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await apiClient.post('/auth', {
        user: username,
        password,
      });

      const token = response.data.accessToken;
      onLogin(token);

      navigate('/');

    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        toast.error('Authentication failed. Please try again.');
        return
      }
      if (error.response.status === 422) {
        toast.error('Invalid username or password. Please try again.');
        return
      }
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleSignup = () => {
    navigate('/register');
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item>
        <TextField label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Grid>
      <Grid item>
        <TextField label="Password" type="password" value={password} variant="outlined" onChange={(e) => setPassword(e.target.value)} />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary" onClick={handleSignup}>
          Sign up
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
