export const pathMap = {
  dummy: {
    getDummyUserList: '/users',
    getDummyUser: '/users/:userId',
    postDummyUser: '/users/:userId',
    getDummyPostList: '/posts',
  },
  annotation: {
    getProjectList: '/annotation-tool/project/list',
    getProjectDetail: '/annotation-tool/project/:projectName',
    getDataList: '/annotation-tool/project/data/:projectName',
    getWavList: '/annotation-tool/project/source/wav/list/:projectName',
    postData: '/annotation-tool/project/data/new/:projectName',
    updateData: '/annotation-tool/project/data/new/:projectName/:recordId',
  },
};

export type PathMapKey = keyof typeof pathMap;
