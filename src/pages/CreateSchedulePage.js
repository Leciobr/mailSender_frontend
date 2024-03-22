import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
import apiClient from '../utils/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function CreateSchedulePage() {
  const [priority, setPriority] = useState('');

  const navigate = useNavigate()

  const generateUniqueString = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.floor(Math.random() * 36).toString(36);
    return timestamp + random;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const res = await apiClient.post('/schedule-emails', {
        idMassa: event.target.idMassa.value,
        priority: Number(priority) ?? null,
        interval: Number(event.target.interval.value) ?? null,
        emailMsg: event.target.emailMsg.value,
        emailSubject: event.target.emailSubject.value,
        emailAttachment: event.target.emailAttachment.value,
        emails: event.target.emails.value.split(','),
        SMTP: {
          nome: event.target.SMTP_nome.value,
          email: event.target.SMTP_email.value,
          user: event.target.SMTP_user.value,
          pwd: event.target.SMTP_pwd.value,
          smtp: event.target.SMTP_smtp.value,
          port: Number(event.target.SMTP_port.value),
          encryption: event.target.SMTP_encryption.value,
          auth: event.target.SMTP_auth.value,
          emailReply: event.target.SMTP_emailReply.value,
        }
      });

      if (res.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'Record created',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          navigate('/')
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error creating record',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }

    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }

  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Record
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="idMassa"
              label="ID Massa"
              variant="outlined"
              fullWidth
              defaultValue={`id-massa-${generateUniqueString()}`}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="priority">Priority</InputLabel>
            <Select
              id="priority"
              fullWidth
              variant="outlined"
              labelId="priority"
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="interval"
              label="Interval in Seconds"
              variant="outlined"
              fullWidth
              type='number'
              defaultValue={10}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="emailMsg"
              label="Email Message"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="emailSubject"
              label="Email Subject"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="emailAttachment"
              label="Email Attachment"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="emails"
              label="Emails"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="SMTP_nome"
              label="SMTP Nome"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="SMTP_email"
              label="SMTP Email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="SMTP_user"
              label="SMTP User"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="SMTP_pwd"
              label="SMTP Password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="SMTP_smtp"
              label="SMTP Host"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="SMTP_port"
              label="SMTP Port"
              variant="outlined"
              fullWidth
              type='number'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="SMTP_encryption"
              label="SMTP Encryption"
              variant="outlined"
              fullWidth
              defaultValue={'SSL'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="SMTP_auth"
              label="SMTP Auth"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="SMTP_emailReply"
              label="SMTP Email Reply"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}


export default CreateSchedulePage;