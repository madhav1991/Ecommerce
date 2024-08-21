/**
 * @jest-environment jsdom
 */
import { render, screen ,fireEvent} from '@testing-library/react';
import { CartItem } from './CartItem';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../../redux/threadsSlice';

jest.mock('./cartitem.css', () => ({}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));


const mockStore = configureStore([]);

test('renders CartItem component without errors', () => {
  render(<Provider store={store}>
    <CartItem />
  </Provider>);
});


test('displays the "Shopping cart" title', async () => {
  render(<Provider store={store}>
    <CartItem />
  </Provider>);
  const titleElement = await screen.findByText('Shopping cart');
  expect(titleElement).toBeInTheDocument();
});


test('renders cart items correctly', async() => {
  const mockProductData = [
    {
      id: 1,
      title: 'Product 1',
      thumbnail: 'path/to/image',
      price: 10,
      quantity: 2,
      description: 'Product description',
    },
    {
      id: 2,
      title: 'Product 2',
      thumbnail: 'path/to/image',
      price: 15,
      quantity: 3,
      description: 'Product description',
    },
  ];

  const store = mockStore({
    threads: {
      productData: mockProductData,
    },
  });


  render(
    <Provider store={store}>
      <CartItem />
    </Provider>
  );

  expect( await screen.findByText('Product 1')).toBeInTheDocument();
  expect(await screen.findByText('Product 2')).toBeInTheDocument();
});



test('calls deleteFromCart action when delete icon is clicked', async () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  const mockProductData = [
    {
      id: 1,
      title: 'Product 1',
      thumbnail: 'path/to/image1',
      price: 10,
      quantity: 2,
      description: 'Product 1 description',
    },
  ];

  const store = mockStore({
    threads: {
      productData: mockProductData,
    },
  });

  render(
    <Provider store={store}>
      <CartItem />
    </Provider>
  );

  const deleteIcon = await screen.findByTestId('cart__product__parent-close-icon');
  fireEvent.click(deleteIcon);

  expect(mockDispatch).toHaveBeenCalledWith(deleteFromCart(1));
});

