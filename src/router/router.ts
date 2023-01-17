export const pathMap = {
  top: {
    path: '/',
    label: 'Top',
  },
  dashboard: {
    path: '/annotation/dashboard',
    label: 'Dashboard',
  },
  dataSource: {
    path: '/annotation/data-source',
    label: 'Data Source',
  },
  projectSettings: {
    path: '/annotation/project-settings',
    label: 'Project Settings',
  },
};
export type PathMapKey = keyof typeof pathMap;
