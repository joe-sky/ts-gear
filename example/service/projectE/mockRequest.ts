/** Don`t modify this file, it will be overwriten next time execute the `tsg` command. */
import { interceptRequest, interceptResponse } from './interceptor'
import { ReplyVOInt } from './definitions'

const { info } = console
if (process && process.env && process.env.NODE_ENV === 'production') {
  throw new Error('mockRequest only used in dev mode')
}

export interface IDeleteApiDataboardBoardEsParam {
  body?: Array<string>
}

/**
 * 删除索引
 */
export function deleteApiDataboardBoardEs(
  param: IDeleteApiDataboardBoardEsParam,
) {
  const [url, option] = interceptRequest('/api/databoard/board/es', param)
  option.method = deleteApiDataboardBoardEs.method
  info('mock fetch: ', url, 'with delete http method, fetch param: ', param)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}

deleteApiDataboardBoardEs.method = 'delete'
