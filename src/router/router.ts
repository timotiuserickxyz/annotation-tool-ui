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
  multipleAnnotation: {
    path: '/annotation/multiple',
    label: 'Multiple Annotation',
  },
};
export type PathMapKey = keyof typeof pathMap;
