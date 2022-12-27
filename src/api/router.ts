export const pathMap = {
  dummy: {
    getDummyUserList: '/users',
    getDummyUser: '/users/:userId',
    postDummyUser: '/users/:userId',
    getDummyPostList: '/posts',
  },
  annotation: {
    getProjectList: '/annotation-project/list',
    getProjectDetail: '/annotation-project/:projectName',
    getProjectDataList: '/annotation-project/data/:projectName',
    postProjectData: '/annotation-project/data/new/:projectName',
    updateProjectData: '/annotation-project/data/update/:projectName/:recordId',
    deleteProjectData: '/annotation-project/data/delete/:projectName/:recordId',
  },
};

export type PathMapKey = keyof typeof pathMap;
