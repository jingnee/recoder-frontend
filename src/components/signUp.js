import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import { Select } from '@material-ui/core';
import axios from 'axios';
//const API_URL = '/user/create';

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function SignUp(){

  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    encrypted_password: '',
    gender: ''
  });

  const handleChangeForm = e => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const url = '/recoder/users';
    axios.post(url, {
      name: values.name,
      email: values.email,
      encrypted_password: values.encrypted_password,
      gender: values.gender
    })
    console.log(values.name, values.email, values.encrypted_password, values.gender);
    setValues({
      name: "",
      email: "",
      encrypted_password: "",
      gender: ""
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>             
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChangeForm}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="encrypted_password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.encrypted_password}
                onChange={handleChangeForm}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={handleChangeForm}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Select
                variant="outlined"
                required
                fullWidth
                id="gender"
                // select
                value={values.gender}
                onChange={handleChangeForm}
                inputProps={{
                  name: 'gender',
                  id: 'gender'
                }}
                >
                <MenuItem value="Female">여성</MenuItem>
                <MenuItem value="Male">남성</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
