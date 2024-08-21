import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import {Product} from './pages/Product/Product';
import {Cart} from './pages/Cart/Cart'
import { productsData } from './api/Api';


const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>,
    loader: productsData,
  },
  {
    path:'/product/:id',
    element: <Product/>
  },
  {
    path: '/cart',
    element: <Cart/>
  },
])

  
  
  function App() {
    return (
      <div className="app">
        <RouterProvider router={router}/>
      </div>
    );
  }

export default App;
