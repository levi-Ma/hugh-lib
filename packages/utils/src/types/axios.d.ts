/**
 * axios 扩展类型
 */
import type { AxiosResponse } from 'axios';
declare module 'axios' {
  interface AxiosResponse {
    /**
     * uni request HTTP 状态码
     */
    statusCode?: number;
  }
}
