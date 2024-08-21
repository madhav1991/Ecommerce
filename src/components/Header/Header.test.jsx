import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Header } from './Header';

const mockStore = configureStore([]);

describe('Header', () => {
  it('renders the header component correctly', () => {
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

    const initialState = {
      threads: {
        productData: mockProductData,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const homeLink = screen.getByText('Home');
    const cartLink = screen.getByRole('link', { name: /cart/i });
    const cartIcon = screen.getByRole('img', { name: /shopping cart/i });
    const itemCounter = screen.getByText('5');

    expect(homeLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
    expect(cartIcon).toBeInTheDocument();
    expect(itemCounter).toBeInTheDocument();
  });
});
