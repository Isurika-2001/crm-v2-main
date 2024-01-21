import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { Button, CardActions, Divider, InputAdornment, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AccountCircle } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useAuthContext } from '../../../context/useAuthContext';
// import MergeTypeIcon from '@mui/icons-material/MergeType';
import { useEffect } from 'react';
import config from '../../../config';

export default function UserForm() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuthContext();
  const [formData, setFormData] = React.useState({});

  useEffect(() => {
    if (user) {
      const data = {
        name: user?.userName,
        email: user?.userEmail
      };
      setFormData(data);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather form data
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      conform_password: e.target.conform_password.value
    };

    const id = user?._id;

    try {
      // Perform the form submission logic, e.g., send data to the server
      const res = await fetch(config.apiUrl + `api/updatePassword/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Handle the server response if needed
      console.log('Server response:', await res.json());
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <MainCard title="Manage My Profile">
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" justifyContent="center">
            <Grid container sx={{ p: 3 }} spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" component="h5">
                  Name
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  name="name"
                  type="text"
                  value={formData.name || ''}
                  sx={{ ...theme.typography.customInput }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" component="h5">
                  Email
                </Typography>
                <TextField
                  fullWidth
                  disabled
                  margin="normal"
                  name="email"
                  type="email"
                  value={formData.email || ''}
                  sx={{ ...theme.typography.customInput }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" component="h5">
                  Password
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  name="password"
                  type="password"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h5" component="h5">
                  Confirm Password
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  name="conform_password"
                  type="password"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Divider />
            </Grid>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button variant="contained" type="submit">
                Update
              </Button>
            </CardActions>
          </Grid>
        </form>
      </MainCard>
    </>
  );
}
