import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Button, Container } from '@material-ui/core';

import { PersistentDrawerLeft } from '../PersistentDrawerLeft';
import { Navigation } from './Navigation';
import Link from '../../base/Link';
import { pathMap } from '../../../router/router';
import { Login } from '../../page/Auth/Login';
import router from 'next/router';

interface Props {}

export const Layout: React.FC<Props> = ({ children }) => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    function checkUserData() {
      const isLoggedIn = Boolean(localStorage.getItem('access_token'));
      setIsUserLoggedIn(isLoggedIn);

      if (!isLoggedIn) {
        router.push('/auth/login');
      }
    }

    checkUserData();
  
    window.addEventListener('storage', checkUserData);
  
    return () => {
      window.removeEventListener('storage', checkUserData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.dispatchEvent(new Event("storage"));
  };

  if (isUserLoggedIn)
  {
    return (
      <Container maxWidth="xl">
        <PersistentDrawerLeft
          appBarHeader={
            <>
              <Link
                href={pathMap.top.path}
                style={{
                  display: 'block',
                  height: '100%',
                  width: '100%',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                <Typography variant="h5">Annotation Tool</Typography>
              </Link>

              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </>
          }
          drawerBody={<Navigation />}
        >
          {children}
        </PersistentDrawerLeft>
      </Container>
    );
  }
  else
  {
    return (
      <Login />
    );
  }
};
