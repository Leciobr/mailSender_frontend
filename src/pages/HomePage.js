import React from 'react';
import { Grid } from '@material-ui/core';
// import Dashboard from '../components/Dashboard/Dashboard'
// import Wallet from '../components/Wallet/Wallet'
import RecordsPage from './RecordsPage';

const HomePage = () => {
  return (
    <div>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <RecordsPage />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
