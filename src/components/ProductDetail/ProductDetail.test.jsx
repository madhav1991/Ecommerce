/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/threadsSlice';
import { ProductDetail } from './ProductDetail';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('ProductDetail', () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const product = {
    id: 1,
    title: 'Product 1',
    thumbnail: 'path/to/image',
    price: 10,
    category: 'Category',
  };

  test('renders product details correctly', async () => {
    render(
      <ProductDetail
        product={product}
        title={product.title}
        price={product.price}
        thumbnail={product.thumbnail}
        category={product.category}
      />
    );

    expect(await screen.findByAltText('green iguana')).toBeInTheDocument();
    expect(await screen.findByText('Product 1')).toBeInTheDocument();
    expect(await screen.findByText('10')).toBeInTheDocument();
    expect(await screen.findByText('Category')).toBeInTheDocument();
  });

  test('dispatches addToCart action when "Add to Cart" button is clicked', () => {
    render(
      <ProductDetail
        product={product}
        title={product.title}
        price={product.price}
        thumbnail={product.thumbnail}
        category={product.category}
      />
    );

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      addToCart({
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        quantity: 1,
        description: product.description,
      })
    );
  });

  test('navigates to product detail page when image is clicked', async () => {
    render(
      <ProductDetail
        product={product}
        title={product.title}
        price={product.price}
        thumbnail={product.thumbnail}
        category={product.category}
      />
    );

    const productImage = await screen.findByAltText('green iguana');
    fireEvent.click(productImage);

    expect(mockNavigate).toHaveBeenCalledWith(`/product/product1`, {
      state: { item: product },
    });
  });
});
