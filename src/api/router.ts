export const pathMap = {
  dummy: {
    getDummyUserList: '/users',
    getDummyUser: '/users/:userId',
    postDummyUser: '/users/:userId',
    getDummyPostList: '/posts',
  },
  annotation: {
    getProjectList: '/annotation-project/list',
    getProjectDetail: '/annotation-project/detail/:projectName',
    postProject: '/annotation-project/new',
    putProject: '/annotation-project/config/update/:projectName',
    deleteProject: '/annotation-project/delete/:projectName',
    postProjectLabel: '/annotation-project/label/new',
    deleteProjectLabel: '/annotation-project/label/delete/:projectName/:labelName',
    getWavFolderList: '/wav-data/list',
    getWavFileList: '/wav-data/list/:folderName',
    getRawFolderList: '/dataset/source/list',
    getRawFileList: '/dataset/source/list/:folderName',
    getRawFileDataList: '/dataset/source/load/:folderName/:fileName',
    getProjectDataList: '/annotation-project/data/list/:projectName',
    postProjectData: '/annotation-project/data/new',
    putProjectData: '/annotation-project/data/update/:projectName/:recordId',
    deleteProjectData: '/annotation-project/data/delete/:projectName',
    clearProjectData: '/annotation-project/data/delete/:projectName',
    downloadProjectData: '/annotation-project/data/download/:projectName',
    exportProjectData: '/annotation-project/data/export/:projectName',
    createRawFolder: '/dataset/source/folder/new',
    createWavFolder: '/wav-data/folder/new',
    uploadRawFile: '/dataset/source/file/upload',
    uploadWavFile: '/wav-data/file/upload',
    getProjectAggregatedDataList: '/annotation-project/data/aggregated/list/:projectName',
    downloadProjectAggregatedData: '/annotation-project/data/aggregated/download/:projectName',
    exportProjectAggregatedData: '/annotation-project/data/aggregated/export/:projectName',
  },
};

export type PathMapKey = keyof typeof pathMap;
