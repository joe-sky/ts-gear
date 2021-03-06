/** Don`t modify this file, it will be overwriten next time execute the `tsg` command. */
export class Order {
  public id?: number
  public petId?: number
  public quantity?: number
  public shipDate?: string
  /**
   * Order Status
   */
  public status?: 'placed' | 'approved' | 'delivered'
  public complete?: boolean = false
}

export class User {
  public id?: number
  public username?: string
  public firstName?: string
  public lastName?: string
  public email?: string
  public password?: string
  public phone?: string
  /**
   * User Status
   */
  public userStatus?: number
}

export class Category {
  public id?: number
  public name?: string
}

export class Tag {
  public id?: number
  public name?: string
}

export class Pet {
  public id?: number
  public category?: Category
  public name: string
  public photoUrls: Array<string>
  public tags?: Array<Tag>
  /**
   * pet status in the store
   */
  public status?: 'available' | 'pending' | 'sold'
}

export class ApiResponse {
  public code?: number
  public type?: string
  public message?: string
}
