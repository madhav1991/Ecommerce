import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import {Header} from '../../components/Header/Header';
import { addToCart } from '../../redux/threadsSlice';
import './products.css'

export const Product = () => {
  const dispatch = useDispatch() 
  const [details, setDetails] = useState({})
  let [baseQty, setBaseQty] = useState(1) 

  const location = useLocation()
  useEffect(()=>{
    setDetails(location.state.item)
  }, [location.state.item]);
  // const {thumbnail, title , }
  return (
    <div>
      <Header/>
      <div className="products">
        <div className="products__image">
          <img className='products__image__cover' src={details.thumbnail} alt={details.title} />
        </div>
        <div>
            <div>
              <h2>{details.title}</h2>
              <div >
                <div>
                  ${details.price}
                </div>
              </div>
            </div>
            <div >
              <div>
              <StarIcon/>
              <StarIcon/>
              <StarIcon/>
              <StarIcon/>
              <StarIcon/>
              </div>
              <p >({details?.rating} Customer reviews)</p>
            </div>
              <p >{details.description}</p>
              <div >
                <div>
                  <p>Quantity</p>
                  <div>
                    <Button onClick={()=>  setBaseQty(baseQty>1?baseQty-1:1)} className=''>-</Button>
                    <span>{baseQty}</span>
                    <Button onClick={()=>setBaseQty(baseQty+1)} className=''>+</Button>
                  </div>
                </div>
                <Button onClick={()=>dispatch(addToCart({
                  id: details.id, 
                  title: details.title,
                  thumbnail: details.thumbnail,
                  price: details.price,
                  quantity: baseQty,
                  description: details.description
                }))}>add To Cart</Button>
              </div>
              <p >Category: <span>{details.category}</span></p>
        </div>
      </div> 
    </div>
  )
}

