
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {CartItem} from "../../components/CartItem/CartItem"
import {Header} from '../../components/Header/Header'
import './cart.css';

export const Cart = () => {
  const productData = useSelector((state)=> state.threads.productData);
  const [totalAmount, setTotalAmount] = useState("");

  useEffect(()=>{
    let price=0;
    productData.map((item)=>{
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmount(price)
  }, [productData])

  return (
    <div>
      <Header/>
      <div className='cart'>
        <CartItem/>
        <div className="cart__right">
            <div className='cart__right--totals'>
              <h2>cart totals</h2>  
              <p className='cart__right--subtotal'>
               Subtotal  
             <span className='cart__right--amount'>{totalAmount}</span></p>
             <article>
              <p className='cart__right--shipping'>
                Shipping 
                <span>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos,
                  Veritatis
                </span>
              </p>
             </article>
            </div>
            <p className='cart__right-total'>
             Total <span className='cart__right-total-amount'>${totalAmount}</span>
           </p>
           {/* <button onClick={handleCheckout}>proceed to checkout</button> */}
        </div>
      </div>
    </div>
  )
}



