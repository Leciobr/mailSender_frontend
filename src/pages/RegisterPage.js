import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import clientFactory from '../utils/axios-client';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await clientFactory(
        process.env.REACT_APP_API_URL,
        {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_API_KEY
        }
      ).post('/auth/sign-up', {
        user: username,
        password,
        nivel: 'admin'
      });
      toast.success('Registration successful');
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                type="password"
                value={password}
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleRegister}>
                Register
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
