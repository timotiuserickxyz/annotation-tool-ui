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
    putProject: '/annotation-project/source/update/:projectName',
    deleteProject: '/annotation-project/delete',
    postProjectLabel: '/annotation-project/label/new/:projectName',
    deleteProjectLabel: '/annotation-project/label/delete/:projectName',
    getWavFolderList: '/wav-data/list',
    getRawFolderList: '/dataset/source/list',
    getRawFileList: '/dataset/source/list/:folderName',
    getRawFileDataList: '/dataset/source/load/:folderName/:fileName',
    getProjectDataList: '/annotation-project/data/:projectName',
    postProjectData: '/annotation-project/data/new/:projectName',
    putProjectData: '/annotation-project/data/update/:projectName/:recordId',
    deleteProjectData: '/annotation-project/data/delete/:projectName/:recordId',
    downloadProjectData: '/annotation-project/data/download/:projectName',
  },
};

export type PathMapKey = keyof typeof pathMap;
