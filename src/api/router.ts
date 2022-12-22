export const pathMap = {
  dummy: {
    getDummyUserList: '/users/:projectName',
    getDummyUser: '/users/:userId',
    postDummyUser: '/users/:userId',
    getDummyPostList: '/posts',
  },
  annotation: {
    getProjectList: '/annotation-tool/project/list',
    getProjectDetail: '/annotation-tool/project/:projectName',
    getProjectWavList: '/annotation-tool/project/source/wav/list/:projectName',
    getProjectDataList: '/annotation-tool/project/data/:projectName',
    postProjectData: '/annotation-tool/project/data/new/:projectName',
    updateProjectData: '/annotation-tool/project/data/update/:projectName/:recordId',
    deleteProjectData: '/annotation-tool/project/data/delete/:projectName/:recordId',
  },
};

export type PathMapKey = keyof typeof pathMap;
