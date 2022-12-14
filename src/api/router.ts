export const pathMap = {
  dataset: {
    getDataset: '/dataset/id/:datasetId',
    getDatasets: '/dataset/list',
    deleteDatasets: '/dataset/delete',
    getZips: '/dataset/zip/list',
    getSources: '/dataset/source/list',
    getZipOpen: '/dataset/zip/open',
    getSourceOpen: '/dataset/source/open',
    createDataset: '/dataset/new/source/:sourceName',
    updateDataset: '/dataset/update/:datasetId',
  },
  result: {
    getResults: '/result/list',
    deleteResults: '/result/delete',
  },
  training: {
    startTraining: '/training/start',
  },
};

export type PathMapKey = keyof typeof pathMap;
