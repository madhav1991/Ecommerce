import { Link } from 'react-router-dom';
import {Ecommerce} from '../../images';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
import './Header.css';

export const Header = () => {
  const productData = useSelector((state)=> state.threads.productData);
  let noOfItems=0;
  productData.forEach((product) => {
    noOfItems+= product.quantity;
  });
  
    return (
      <div className="icons">
         <Link to='/'>
            <div >
              <img className="icons__ecommerce" src={Ecommerce} alt="Ecommerce"  />
            </div>
         </Link>
         <div className="icons-right">
        <div>
            <Link to={'/'}>
              <HomeIcon/>
            </Link>
        </div>
        <Link to='/cart'>
          <ShoppingCartIcon/>
          <span className="">{noOfItems}</span>
        </Link>
        </div>
      </div>
    )
  }