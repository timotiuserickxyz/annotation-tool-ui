export const pathMap = {
  top: {
    path: '/',
    label: 'Top',
  },
  dashboard: {
    path: '/annotation/dashboard',
    label: 'Dashboard',
  },
  projectSettings: {
    path: '/annotation/project-settings',
    label: 'Project Settings',
  },
  fileSettings: {
    path: '/annotation/file-settings',
    label: 'File Settings',
  },
};
export type PathMapKey = keyof typeof pathMap;
