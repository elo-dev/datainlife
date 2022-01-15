export interface IProduct {
  rid: number
  rname: string
  goods: IGoods[]
}

export interface IGoods {
  gid: number
  gname: string
  gprice: number
  quantity: number
}