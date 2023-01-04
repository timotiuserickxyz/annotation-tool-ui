export const pathMap = {
  top: {
    path: '/',
    label: 'Top',
  },
  dashboard: {
    path: '/annotation/dashboard',
    label: 'Dashboard',
  },
  settings: {
    path: '/annotation/settings',
    label: 'Settings',
  },
};
export type PathMapKey = keyof typeof pathMap;
