import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

import { PersistentDrawerLeft } from '../PersistentDrawerLeft';
import { Navigation } from './Navigation';
import Link from '../../base/Link';
import { pathMap } from '../../../router/router';
import { Login } from '../../page/Login/Login';

interface Props {}

export const Layout: React.FC<Props> = ({ children }) => {
  
  const isUserLoggedIn: boolean = Boolean(typeof window !== 'undefined' ? localStorage.getItem('access_token') : '');

  if (isUserLoggedIn)
  {
    return (
      <Container maxWidth="xl">
        <PersistentDrawerLeft
          appBarHeader={
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
