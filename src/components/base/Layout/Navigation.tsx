import React from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { List } from '@material-ui/core';

import { pathMap } from '../../../router/router';
import Link from '../../base/Link';

// Useful stuffs
// import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// import ComputerIcon from '@material-ui/icons/Computer';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
// import Divider from '@material-ui/core/Divider';
// import { HelpOutline } from '@material-ui/icons';

interface Props {}

const navTop = {
  dashboard: {
    label: 'Dashboard',
    icon: <HomeOutlinedIcon />,
    path: pathMap.dashboard.path,
  },
  projectSettings: {
    label: 'Project Settings',
    icon: <SettingsIcon />,
    path: pathMap.projectSettings.path,
  },
  fileSettings: {
    label: 'File Settings',
    icon: <SettingsApplicationsIcon />,
    path: pathMap.fileSettings.path,
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
          href={navTop.projectSettings.path}
          style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
        >
          <ListItem button>
            <ListItemIcon>{navTop.projectSettings.icon}</ListItemIcon>
            <ListItemText primary={navTop.projectSettings.label} />
          </ListItem>
        </Link>
        <Link
          href={navTop.fileSettings.path}
          style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
        >
          <ListItem button>
            <ListItemIcon>{navTop.fileSettings.icon}</ListItemIcon>
            <ListItemText primary={navTop.fileSettings.label} />
          </ListItem>
        </Link>
        {/* <Link
          href={navTop.training.path}
          style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
        >
          <ListItem button>
            <ListItemIcon>{navTop.training.icon}</ListItemIcon>
            <ListItemText primary={navTop.training.label} />
          </ListItem>
        </Link>
        <Link
          href={navTop.trainingResults.path}
          style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
        >
          <ListItem button>
            <ListItemIcon>{navTop.trainingResults.icon}</ListItemIcon>
            <ListItemText primary={navTop.trainingResults.label} />
          </ListItem>
        </Link> */}
      </List>
      {/* <Divider />
      <List>
        <ListItem button href={navBottom.server.path} disabled>
          <ListItemIcon>{navBottom.server.icon}</ListItemIcon>
          <ListItemText primary={navBottom.server.label} />
        </ListItem>
        <ListItem button href={navBottom.notification.path} disabled>
          <ListItemIcon>{navBottom.notification.icon}</ListItemIcon>
          <ListItemText primary={navBottom.notification.label} />
        </ListItem>
        <ListItem button href={navBottom.help.path} disabled>
          <ListItemIcon>{navBottom.help.icon}</ListItemIcon>
          <ListItemText primary={navBottom.help.label} />
        </ListItem>
      </List> */}
    </>
  );
};
