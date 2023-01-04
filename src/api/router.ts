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
    postProject: '/annotation-project/new',
    deleteProject: '/annotation-project/delete',
    putProject: '/annotation-project/source/update/:projectName',
    getWavFolderList: '/wav-data/list',
    getRawFolderList: '/dataset/source/list',
    getRawFileList: '/dataset/source/list/:folderName',
    getRawFileDataList: '/dataset/source/load/:folderName/:fileName',
    getProjectDataList: '/annotation-project/data/:projectName',
    postProjectData: '/annotation-project/data/new/:projectName',
    updateProjectData: '/annotation-project/data/update/:projectName/:recordId',
    deleteProjectData: '/annotation-project/data/delete/:projectName/:recordId',
  },
};

export type PathMapKey = keyof typeof pathMap;
