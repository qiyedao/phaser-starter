import { parse } from 'querystring';

export const getPageQuery = (url?: string) =>
  url ? parse(url) : parse(window.location.href.split('?')[1]);

export const flat = (arr: any[]) => {
  let arr1: any[] = [];
  arr.forEach((element) => {
    if (element instanceof Array) {
      arr1 = arr1.concat(flat(element));
    } else {
      arr1.push(element);
    }
  });
  return arr1;
};
