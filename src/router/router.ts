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
  dataSource: {
    path: '/annotation/data-source',
    label: 'Data Source',
  },
};
export type PathMapKey = keyof typeof pathMap;
