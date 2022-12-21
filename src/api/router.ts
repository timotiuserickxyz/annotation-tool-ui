export const pathMap = {
  dummy: {
    getDummyUserList: '/users',
    getDummyUser: '/users/:userId',
    postDummyUser: '/users/:userId',
    getDummyPostList: '/posts',
  },
  annotation: {
    getProjectList: '/annotation-tool/project/list',
  },
};

export type PathMapKey = keyof typeof pathMap;
