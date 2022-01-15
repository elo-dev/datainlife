import React from 'react'
import { IGoods, IProduct } from '../../../redux/interface'
import style from './Table.module.scss'

interface Props {
  products: IProduct[]
  setValue: (quantity: number, gid: number) => void
}

export const Table = ({ products, setValue }: Props) => {
  return (
    <div>
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
