import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { Button, CardActions, Divider, InputAdornment, useMediaQuery, Typography, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useAuthContext } from '../../../context/useAuthContext';
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

  const handleSubmit = async (values, helpers) => {
    try {
      const id = user?._id;
      const res = await fetch(config.apiUrl + `api/updatePassword/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      console.log('Server response:', await res.json());
    } catch (error) {
      console.error('Error submitting form:', error);
      helpers.setErrors({ submit: error.message });
      helpers.setSubmitting(false);
    }
  };

  return (
    <>
      <MainCard title="Manage My Profile">
        <Formik
          enableReinitialize
          initialValues={{
            name: formData.name || '',
            email: formData.email || '',
            password: '',
            confirm_password: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
            confirm_password: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Confirm Password is required')
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form onSubmit={handleSubmit}>
              <Grid container direction="column" justifyContent="center">
                <Grid container spacing={matchDownSM ? 3 : 2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" component="h5">
                      Name
                    </Typography>
                    <TextField
                      fullWidth
                      label="Name"
                      margin="dense"
                      name="name"
                      onBlur={(e) => {
                        handleBlur(e);
                        handleChange(e);
                      }}
                      onChange={handleChange}
                      defaultValue={formData.name}
                      value={values.name}
                      variant="outlined"
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon />
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
                      label="Email"
                      margin="dense"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={formData.email}
                      variant="outlined"
                      disabled
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
                      New Password
                    </Typography>
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      margin="dense"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      variant="outlined"
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
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
                      type="password"
                      label="Confirm Password"
                      margin="dense"
                      name="confirm_password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirm_password}
                      variant="outlined"
                      error={Boolean(touched.confirm_password && errors.confirm_password)}
                      helperText={touched.confirm_password && errors.confirm_password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 3, mb: 2 }} />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Save Changes
                  </Button>
                </CardActions>
                {errors.submit && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.submit}
                  </Alert>
                )}
              </Grid>
            </form>
          )}
        </Formik>
      </MainCard>
    </>
  );
}
