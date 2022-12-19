import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

import { PersistentDrawerLeft } from '../PersistentDrawerLeft';
import { Navigation } from './Navigation';
import Link from '../../base/Link';
import { pathMap } from '../../../router/router';

interface Props {}

export const Layout: React.FC<Props> = ({ children }) => {
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
            <Typography variant="h5">AnnotationTool</Typography>
          </Link>
        }
        drawerBody={<Navigation />}
      >
        {children}
      </PersistentDrawerLeft>
    </Container>
  );
};
