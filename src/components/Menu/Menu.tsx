import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IProduct } from '../../redux/interface'
import style from './Menu.module.scss'

interface Props {}

export const Menu = (props: Props) => {
  const { products } = useSelector((state: any) => state.products)

  return (
    <div className={style.container}>
      <ul className={style.menu__list}>
        {products.map((item: IProduct) => (
          <li key={item.rid} className={style.menu__item}>
            <Link to={String(item.rid)} className={style.item__text}>{item.rname}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
