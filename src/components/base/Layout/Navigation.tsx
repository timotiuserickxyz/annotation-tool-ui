import React from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import FolderIcon from '@material-ui/icons/Folder';
import PeopleIcon from '@material-ui/icons/People';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { List } from '@material-ui/core';

import { pathMap } from '../../../router/router';
import Link from '../../base/Link';

interface Props {}

const navTop = {
  dashboard: {
    label: 'Dashboard',
    icon: <HomeOutlinedIcon />,
    path: pathMap.dashboard.path,
  },
  dataSource: {
    label: 'Data Source',
    icon: <FolderIcon />,
    path: pathMap.dataSource.path,
  },
  projectSettings: {
    label: 'Project Settings',
    icon: <SettingsIcon />,
    path: pathMap.projectSettings.path,
  },
  multipleAnnotation: {
    label: 'Multiple Annotation',
    icon: <PeopleIcon />,
    path: pathMap.multipleAnnotation.path,
  },
};

export const Navigation: React.FC<Props> = () => {
  return (
    <>
      <List>
        <Link
          href={navTop.dashboard.path}
          style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
        >
          <ListItem button>
            <ListItemIcon>{navTop.dashboard.icon}</ListItemIcon>
            <ListItemText primary={navTop.dashboard.label} />
          </ListItem>
        </Link>
        <Link
          href={navTop.dataSource.path}
          style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
        >
          <ListItem button>
            <ListItemIcon>{navTop.dataSource.icon}</ListItemIcon>
            <ListItemText primary={navTop.dataSource.label} />
          </ListItem>
        </Link>
        <Link
          href={navTop.projectSettings.path}
          style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
        >
          <ListItem button>
            <ListItemIcon>{navTop.projectSettings.icon}</ListItemIcon>
            <ListItemText primary={navTop.projectSettings.label} />
          </ListItem>
        </Link>
        <Link
          href={navTop.multipleAnnotation.path}
          style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
        >
          <ListItem button>
            <ListItemIcon>{navTop.multipleAnnotation.icon}</ListItemIcon>
            <ListItemText primary={navTop.multipleAnnotation.label} />
          </ListItem>
        </Link>
      </List>
    </>
  );
};
