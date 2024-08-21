import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { addToCart } from '../../redux/threadsSlice';
import React from 'react';

export const ProductDetail = ({product,title, price, thumbnail, category}) => {
    const id = title;
    const idString = (Title)=>{
      const newIdString = String(Title).toLowerCase().split(" ").join("");
      return newIdString;
    } 
  const rootId = idString(id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handeImageClick = ()=>{
    navigate(`/product/${rootId}`,{
      state: {
        item: product
      }
    })
  }
  return (
    <Card sx={{ maxWidth: 445 }} className="card" key={product.id}>
    <CardMedia
      component="img"
      alt="green iguana"
      height="340"
      image={thumbnail}
      onClick={handeImageClick}
    />
    <CardContent>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {price}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {category}
      </Typography>
    </CardContent>
    <CardActions>
    <Button onClick={()=>dispatch(addToCart({
          id: product.id, 
          title: product.title,
          thumbnail: product.thumbnail,
          price: product.price,
          quantity: 1,
          description: product.description
        }))}>Add to Cart</Button>
    
    </CardActions>
  </Card>
  )
}


