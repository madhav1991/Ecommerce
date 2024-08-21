export const productsData = async () => {
    let url = "https://dummyjson.com/products?limit=16";
    const result = await fetch(url);
    const products = await result.json();
    return products;
  };
  