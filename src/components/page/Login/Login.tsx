import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  TextField,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
  },
  container: {
    width: '90%',
    maxWidth: '400px',
    height: '500px',
    marginTop: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoContainer: {
    width: '100%',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
  },
  logo: {
    width: '40%',
    height: 'auto',
    margin: 'auto',
  },
  content: {
    width: '100%',
    maxWidth: '400px',
    height: '300px',
    borderRadius: '5px',
    border: 'solid 1px gray',
  },
  header: {
    width: '100%',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    color: 'white',
    padding: '20px',
  },
  formContainer: {
    width: '100%',
    height: 'calc(100% - 50px)',
    padding: '20px',
  },
  customForm: {
    width: '100%',
  },
  loading: {
    display: 'block',
    margin: 'auto',
  },
});

interface Props {}

export const Login: React.FC<Props> = () => {
  const classes = useStyles();

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChangeUsername = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setUsername(value);
  };
  
  const handleChangePassword = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setPassword(value);
  };

  const authenticateUser = async() => {
    setSnackbarMessage('Authenticating...');
    setOpenSnackbar(true);
    setIsLoading(!isLoading);

    // Todo: login logic here
    // 
    // 
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <img className={classes.logo} src='/empathlogo.png' />
        </div>
        <div className={classes.content}>
          <div className={classes.header}>
            <Typography variant="h5">Annotation Tool</Typography>
          </div>
          <div className={classes.formContainer}>
            <TextField
              variant="outlined"
              label="Username"
              className={classes.customForm}
              autoFocus={true}
              value={username}
              onChange={handleChangeUsername}
            />
            <br/>
            <br/>
            <TextField
              variant="outlined"
              type="password"
              label="Password"
              className={classes.customForm}
              value={password}
              onChange={handleChangePassword}
            />
            <br/>
            <br/>
            <Button
              variant="contained"
              className={classes.customForm}
              onClick={authenticateUser}>
              Submit
            </Button>
          </div>
        </div>
        <br/>
        <CircularProgress className={classes.loading} style={{visibility: (isLoading ? 'visible' : 'hidden')}} />
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </div>
  );
};
