import { interceptRequest, interceptResponse } from './interceptor'
import { Pet, ApiResponse, Order, User } from './definitions'

const { info } = console
if (process && process.env && process.env.NODE_ENV === 'production') {
  throw new Error('mockRequest only used in dev mode')
}

export interface IPostPetParam {
  body: Pet
}

/**
 * Add a new pet to the store
 */
export function postPet(param: IPostPetParam) {
  const [url, option] = interceptRequest('/v2/pet', param)
  option.method = 'post'
  info('mock fetch: ', url, 'with post http method, fetch param: ', param)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}

export interface IPutPetParam {
  body: Pet
}

/**
 * Update an existing pet
 */
export function putPet(param: IPutPetParam) {
  const [url, option] = interceptRequest('/v2/pet', param)
  option.method = 'put'
  info('mock fetch: ', url, 'with put http method, fetch param: ', param)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}

export interface IGetPetFindByStatusParam {
  query: {
    status: Array<'available' | 'pending' | 'sold'>
  }
}

type GetPetFindByStatusResponse = Array<Pet>
/**
 * Finds Pets by status
 * Multiple status values can be provided with comma separated strings
 */
export function getPetFindByStatus(param: IGetPetFindByStatusParam) {
  const [url, option] = interceptRequest('/v2/pet/findByStatus', param)
  option.method = 'get'
  info('mock fetch: ', url, 'with get http method, fetch param: ', param)
  const response = new Response(
    '[{"id":0,"category":{"id":0,"name":"string"},"name":"doggie","photoUrls":["string"],"tags":[{"id":0,"name":"string"}],"status":"available"}]',
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response).then<GetPetFindByStatusResponse>(interceptResponse)
}

export interface IGetPetPetIdParam {
  path: {
    petId: number
  }
}

/**
 * Find pet by ID
 * Returns a single pet
 */
export function getPetPetId(param: IGetPetPetIdParam) {
  const [url, option] = interceptRequest('/v2/pet/:petId', param)
  option.method = 'get'
  info('mock fetch: ', url, 'with get http method, fetch param: ', param)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}

export interface IPostPetPetIdParam {
  path: {
    petId: number
  }
  formData?: {
    name?: string
    status?: string
  }
}

/**
 * Updates a pet in the store with form data
 */
export function postPetPetId(param: IPostPetPetIdParam) {
  const [url, option] = interceptRequest('/v2/pet/:petId', param)
  option.method = 'post'
  info('mock fetch: ', url, 'with post http method, fetch param: ', param)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}

export interface IDeletePetPetIdParam {
  header?: {
    api_key?: string
  }
  path: {
    petId: number
  }
}

/**
 * Deletes a pet
 */
export function deletePetPetId(param: IDeletePetPetIdParam) {
  const [url, option] = interceptRequest('/v2/pet/:petId', param)
  option.method = 'delete'
  info('mock fetch: ', url, 'with delete http method, fetch param: ', param)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}

export interface IPostPetPetIdUploadImageParam {
  path: {
    petId: number
  }
  formData?: {
    additionalMetadata?: string
    file?: File
  }
}

/**
 * uploads an image
 */
export function postPetPetIdUploadImage(param: IPostPetPetIdUploadImageParam) {
  const [url, option] = interceptRequest('/v2/pet/:petId/uploadImage', param)
  option.method = 'post'
  info('mock fetch: ', url, 'with post http method, fetch param: ', param)
  const response = new Response('{"code":0,"type":"string","message":"string"}', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response).then<ApiResponse>(interceptResponse)
}

type GetStoreInventoryResponse = any
/**
 * Returns pet inventories by status
 * Returns a map of status codes to quantities
 */
export function getStoreInventory() {
  const [url, option] = interceptRequest('/v2/store/inventory')
  option.method = 'get'
  info('mock fetch: ', url, 'with get http method, fetch param: ', undefined)
  const response = new Response('{"additionalProp1":0,"additionalProp2":0,"additionalProp3":0}', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response).then<GetStoreInventoryResponse>(interceptResponse)
}

export interface IPostStoreOrderParam {
  body: Order
}

/**
 * Place an order for a pet
 */
export function postStoreOrder(param: IPostStoreOrderParam) {
  const [url, option] = interceptRequest('/v2/store/order', param)
  option.method = 'post'
  info('mock fetch: ', url, 'with post http method, fetch param: ', param)
  const response = new Response(
    '{"id":0,"petId":0,"quantity":0,"shipDate":"2019-09-03T00:00:00.000Z","status":"placed","complete":false}',
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response).then<Order>(interceptResponse)
}

export interface IGetStoreOrderOrderIdParam {
  path: {
    orderId: number
  }
}

/**
 * Find purchase order by ID
 * For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
 */
export function getStoreOrderOrderId(param: IGetStoreOrderOrderIdParam) {
  const [url, option] = interceptRequest('/v2/store/order/:orderId', param)
  option.method = 'get'
  info('mock fetch: ', url, 'with get http method, fetch param: ', param)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}

export interface IDeleteStoreOrderOrderIdParam {
  path: {
    orderId: number
  }
}

/**
 * Delete purchase order by ID
 * For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
 */
export function deleteStoreOrderOrderId(param: IDeleteStoreOrderOrderIdParam) {
  const [url, option] = interceptRequest('/v2/store/order/:orderId', param)
  option.method = 'delete'
  info('mock fetch: ', url, 'with delete http method, fetch param: ', param)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}

export interface IPostUserParam {
  body: User
}

/**
 * Create user
 * This can only be done by the logged in user.
 */
export function postUser(param: IPostUserParam) {
  const [url, option] = interceptRequest('/v2/user', param)
  option.method = 'post'
  info('mock fetch: ', url, 'with post http method, fetch param: ', param)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}

export interface IPostUserCreateWithArrayParam {
  body: Array<User>
}

/**
 * Creates list of users with given input array
 */
export function postUserCreateWithArray(param: IPostUserCreateWithArrayParam) {
  const [url, option] = interceptRequest('/v2/user/createWithArray', param)
  option.method = 'post'
  info('mock fetch: ', url, 'with post http method, fetch param: ', param)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}

export interface IPostUserCreateWithListParam {
  body: Array<User>
}

/**
 * Creates list of users with given input array
 */
export function postUserCreateWithList(param: IPostUserCreateWithListParam) {
  const [url, option] = interceptRequest('/v2/user/createWithList', param)
  option.method = 'post'
  info('mock fetch: ', url, 'with post http method, fetch param: ', param)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}

export interface IGetUserLoginParam {
  query: {
    username: string
    password: string
  }
}

type GetUserLoginResponse = string
/**
 * Logs user into the system
 */
export function getUserLogin(param: IGetUserLoginParam) {
  const [url, option] = interceptRequest('/v2/user/login', param)
  option.method = 'get'
  info('mock fetch: ', url, 'with get http method, fetch param: ', param)
  const response = new Response('"string"', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response).then<GetUserLoginResponse>(interceptResponse)
}

/**
 * Logs out current logged in user session
 */
export function getUserLogout() {
  const [url, option] = interceptRequest('/v2/user/logout')
  option.method = 'get'
  info('mock fetch: ', url, 'with get http method, fetch param: ', undefined)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}

export interface IGetUserUsernameParam {
  path: {
    username: string
  }
}

/**
 * Get user by user name
 */
export function getUserUsername(param: IGetUserUsernameParam) {
  const [url, option] = interceptRequest('/v2/user/:username', param)
  option.method = 'get'
  info('mock fetch: ', url, 'with get http method, fetch param: ', param)
  const response = new Response(
    '{"id":0,"username":"string","firstName":"string","lastName":"string","email":"string","password":"string","phone":"string","userStatus":0}',
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response).then<User>(interceptResponse)
}

export interface IPutUserUsernameParam {
  path: {
    username: string
  }
  body: User
}

/**
 * Updated user
 * This can only be done by the logged in user.
 */
export function putUserUsername(param: IPutUserUsernameParam) {
  const [url, option] = interceptRequest('/v2/user/:username', param)
  option.method = 'put'
  info('mock fetch: ', url, 'with put http method, fetch param: ', param)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}

export interface IDeleteUserUsernameParam {
  path: {
    username: string
  }
}

/**
 * Delete user
 * This can only be done by the logged in user.
 */
export function deleteUserUsername(param: IDeleteUserUsernameParam) {
  const [url, option] = interceptRequest('/v2/user/:username', param)
  option.method = 'delete'
  info('mock fetch: ', url, 'with delete http method, fetch param: ', param)
  const response = new Response('', {
    headers: { 'Content-Type': 'application/json' },
  })
  Reflect.defineProperty(response, 'url', {
    value: url,
  })
  return Promise.resolve(response)
}
