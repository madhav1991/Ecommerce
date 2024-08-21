import { useEffect, useState } from "react"
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import './home.css';
import { useLoaderData } from "react-router-dom"
import {Header} from '../../components/Header/Header';
import { ProductDetail } from "../../components/ProductDetail/ProductDetail";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const data = useLoaderData();

  useEffect(()=>{
    setProducts(data.products);
  },[data])

  const handleFetchMoreItems = async () =>  {
    const nextResultsCount = 8;
    setIsFetching(true);
    const result = await fetch(`https://dummyjson.com/products?limit=${nextResultsCount}&skip=${products.length}`);
    const data = await result.json();
    setProducts([...products, ...data.products]);
  }

  const [isFetching,setIsFetching] = useInfiniteScroll(handleFetchMoreItems);

  return (
    <div>
    <Header/>
    <div className="home__cart">
       {products && products?.map((product) => {
        const {title, price, thumbnail, category} =product;
        return (
          <div key={product.id}>
            <ProductDetail
              product = {product}
              title={title}
              price ={price}
              thumbnail ={thumbnail}
              category ={category}
            />
          </div>
        )
       })}
      {isFetching && <p>Loading...</p>}
       <div id="scrollObserverSelector"></div>
    </div>
    </div>
  )
}
