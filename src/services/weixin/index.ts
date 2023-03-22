// @ts-ignore
/* eslint-disable */
import { AxiosGet } from '@/utils/request';
import Apis from '../Apis';

/** url 签名 GET /api/currentUser */
export async function getWechatJsAPi(params: { url: string }): Promise<any> {
  return AxiosGet(`${Apis.Login}`, {});
}
/** 获取Appid GET /api/currentUser */
export async function getAPPId(): Promise<any> {
  return AxiosGet(`${Apis.Login}`, {});
}
/** 获取Appid GET /api/currentUser */
export async function getWechatUser(params: { code: string }): Promise<any> {
  return AxiosGet(`${Apis.Login}`, {});
}

/**
 * get token
 */
export async function getToken(params: { userId?: string; param: 'test' }) {
  return AxiosGet(`${Apis.Login}`, {});
}
/**
 *注册第三方userId
 */
export async function userLogin(params: { userId?: string; qaUserSourceTypeValue: 4 }) {
  return AxiosGet(`${Apis.Login}`, {});
}
