import { compile } from 'path-to-regexp';
import { pathMap, PathMapKey } from '../router/router';
import {
  pathMap as apiPathMap,
  PathMapKey as APIPathMapKey,
} from '../api/router';

export function getUrl(
  pageName: PathMapKey,
  query: { [key: string]: any } = {},
  params: { [key: string]: any } = {},
) {
  if (!pathMap) {
    console.warn('can not get pathMap');
    return '';
  }
  const matchPathMapKey = Object.keys(pathMap).find((key) => key === pageName);
  const search = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&');
  if (matchPathMapKey) {
    const targetPath = pathMap[matchPathMapKey as PathMapKey].path;

    if (targetPath.startsWith('http://')) {
      return targetPath;
    }

    const toPath = compile(targetPath);
    return `${toPath(params)}${search ? `?${search}` : ''}`;
  }
  return '';
}

export function getAPIUrl<
  K1 extends APIPathMapKey,
  K2 extends keyof typeof apiPathMap[K1]
>(repo: K1, methodName: K2, path: { [key: string]: any } = {}) {
  if (!apiPathMap) {
    console.warn('can not get pathMap');
    return '';
  }
  const matchPathMapKey = Object.keys(apiPathMap[repo]).find(
    (key) => key === methodName,
  );

  if (matchPathMapKey) {
    const targetPath = apiPathMap[repo][matchPathMapKey as never];
    const toPath = compile(targetPath);
    return `${toPath(path)}`;
  }

  return '';
}

export const getPageName = (route: string) => {
  const path = route.replace(/\[/g, ':').replace(/\]/g, '');
  const find = Object.entries(pathMap)
    .map(([, value]) => value)
    .find((value) => value.path === path);
  if (!find) {
    return '';
  }
  return find.label;
};
