import React, { useEffect, useState } from 'react'
import style from './Products.module.scss'
import { instance } from '../../network/api'
import { useDispatch, useSelector } from 'react-redux'
import { setProductsAction } from '../../redux/actions'
import { ProductLine } from '../ProductLine/ProductLine'
import { IGoods, IProduct } from '../../redux/interface'
import { useLocation } from 'react-router'
import { Table } from './Table/Table'

export const Products = () => {
  const [section, setSection] = useState<IProduct[]>([])

  const { products } = useSelector((state: any) => state.products)
  const dispatch = useDispatch()

  const location = useLocation()

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
          if (Math.sign(quantity) !== -1) {
            return Object.defineProperty(good, 'quantity', { value: +quantity })
          }
        }
        return item
      })
      dispatch(setProductsAction(products))
    })
  }

  const getProductsOfId = () => {
    const urlId = location.pathname.slice(1)
    const arr: IProduct[] = []
    products.map((item: IProduct) => {
      if (item.rid == +urlId) {
        arr.push(item)
      }
    })
    setSection(arr)
  }

  useEffect(() => {
    getProductsOfId()
  }, [location.pathname])

  const RenderProduct = () => {
    const urlId = location.pathname.slice(1)
    if (urlId === '') {
      return <Table products={products} setValue={setValue} />
    } else {
      return <Table products={section} setValue={setValue} />
    }
  }

  return (
    <>
      <div className={style.container}>
        <RenderProduct />
      </div>
      <ProductLine />
    </>
  )
}
