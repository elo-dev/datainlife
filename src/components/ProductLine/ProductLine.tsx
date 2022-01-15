import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { instance } from '../../network/api'
import { IGoods, IProduct } from '../../redux/interface'
import style from './ProductLine.module.scss'

interface Props {}

export const ProductLine = (props: Props) => {
  const [amountItem, setAmountItem] = useState<any>([])
  const [amount, setAmount] = useState<number>(0)

  const { products } = useSelector((state: any) => state.products)

  const addToCart = () => {
    const arr: Array<IGoods> = []
    let formData = new FormData()
    products.map((item: IProduct) => {
      item.goods.map((good: IGoods) => {
        if (good.quantity !== 0) {
          arr.push(good)
          formData.append(String(good.gid), String(good.quantity))
        }
      })
    })

    instance
      .post('add_basket.php', formData)
      .then((res) => console.log(res.data))
    setAmountItem(arr)
  }

  useEffect(() => {
    totalCost()
  }, [amountItem])

  const totalCost = () => {
    const total = amountItem.map((item: IGoods) => {
      const sum = item.gprice * item.quantity
      return sum
    })
    setAmount(total.reduce((a: number, b: number) => a + b, 0))
  }

  return (
    <div className={style.container}>
      <div className={style.productLine}>
        <span>Итого: {amount} руб</span>
        <span>
          {amountItem.length >= 1 && amountItem.length <= 4
            ? `${amountItem.length} товара`
            : `${amountItem.length} товаров`}
        </span>
        <button className={style.cart} onClick={addToCart}>
          В корзину
        </button>
      </div>
    </div>
  )
}
