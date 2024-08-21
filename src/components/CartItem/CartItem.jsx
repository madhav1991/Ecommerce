import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { decrementQantity, deleteFromCart, incrementQuantity, resetCart } from "../../redux/threadsSlice";
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './cartitem.css';

export const CartItem = () => {
  const dispatch = useDispatch()

  const productData = useSelector((state) => state.threads.productData)

    return (
      <div className="cart__item">
        <div className="cart__item__text" role="article">
            <h2>Shopping cart</h2>
        </div>
        <div>
          {
            productData.map((item) => {
              return (
                <div key={item.id} className="cart__product__parent" test-id="cart__product__parent">
                  <div className="cart__product__parent-icon-image">
                    <CloseIcon onClick={() => dispatch(deleteFromCart(item.id))} className="cart__product__parent-close-icon" data-testid="cart__product__parent-close-icon"/>
                    <img src={item.thumbnail} className="cart__product__image" alt={item.title} />
                  </div>
                  <h2 className="cart__product__title">{item.title}</h2>
                  <div className='cart__product__quantity'>
                    <p>Quantity</p>
                    <div className='cart__product__add-remove'>
                      <RemoveIcon
                        className="cart__product-remove-icon"
                        onClick={() => dispatch(decrementQantity({
                          id: item.id,
                          title: item.title,
                          thumbnail: item.thumbnail,
                          price: item.price,
                          quantity: 1,
                          description: item.description
                        }))}
                      >-</RemoveIcon>
                      <span>{item.quantity}</span>
                      <AddIcon
                        className="cart__product-add-icon"
                        onClick={() => dispatch(incrementQuantity({
                          id: item.id,
                          title: item.title,
                          thumbnail: item.thumbnail,
                          price: item.price,
                          quantity: 1,
                          description: item.description
                        }))}
                      >+</AddIcon>
                    </div>
                  </div>
                  <p className="cart__product__cost">Cost</p>
                  <p>${item.price * item.quantity}</p>
                </div>
              )
            })
          }
          <Button onClick={() => dispatch(resetCart())} className='cart__item--reset-cart'>Reset Cart</Button>
        </div>
      </div>
    )
}
