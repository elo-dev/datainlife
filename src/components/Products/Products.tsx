import React, { useEffect } from 'react'
import style from './Products.module.scss'
import { instance } from '../../network/api'
import { useDispatch, useSelector } from 'react-redux'
import { setProductsAction } from '../../redux/actions'

interface IProduct {
  rid: number
  rname: string
  goods: IGoods[]
}

interface IGoods {
  gid: number
  gname: string
  gprice: number
  quantity: number
}

export const Products = () => {
  const { products } = useSelector((state: any) => state.products)
  const dispatch = useDispatch()

  const getProducts = async () => {
    const data = await instance.get('get_products.php').then((res) => {
      return res.data
    })

    const setProducts = data.map((item: IProduct) => {
      if (item !== undefined) {
        const goods = item.goods
        const product = {
          rid: item.rid,
          rname: item.rname,
          goods: goods.map((good: IGoods) => ({
            gid: good.gid,
            gname: good.gname,
            gprice: good.gprice,
            quantity: 0,
          })),
        }
        return product
      }
    })
    setProducts.pop()
    dispatch(setProductsAction(setProducts))
  }

  useEffect(() => {
    getProducts()
  }, [])

  const setValue = (quantity: number, gid: number) => {
    products.map((item: IProduct) => {
      item.goods.map((good: IGoods) => {
        if (good.gid === gid) {
          if(Math.sign(quantity) !== -1){
            return Object.defineProperty(good, 'quantity', { value: +quantity })
          }
        }
        return item
      })
      dispatch(setProductsAction(products))
    })
  }

  return (
    <div className={style.container}>
      {products.map((item: IProduct) => (
        <table className={style.products} key={item.rid}>
          <caption className={style.products__title}>
            <h1>{item.rname}</h1>
          </caption>
          <thead className={style.products__header}>
            <tr>
              <th>Id</th>
              <th>Название товара</th>
              <th>Цена</th>
              <th>Количество</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody className={style.products__body}>
            {item.goods.map((good: IGoods) => (
              <tr key={good.gid}>
                <td>{good.gid}</td>
                <td>{good.gname}</td>
                <td>{good.gprice}</td>
                <td>
                  <input
                    type="number"
                    placeholder="Колличество"
                    value={good.quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setValue(+e.target.value, good.gid)
                    }
                  />
                </td>
                <td>{good.gprice * good.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  )
}
