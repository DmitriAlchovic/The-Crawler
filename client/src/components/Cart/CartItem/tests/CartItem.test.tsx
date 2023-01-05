import React from 'react';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CartItem from '../CartItem';

jest.mock('react-redux');

describe('CartItem', () => {
  it('should create empty component', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue('');
    const component = render(
      <BrowserRouter>
        <CartItem
          product={{
            productId: 0,
            name: '',
            price: 0,
            discount: {
              name: '',
              discountPercent: 0,
            },
            gallery: '',
            subcategory: {
              name: '',
              category: {
                name: '',
              },
            },
            inventory: {
              currentQuantity: 0,
              initialQuantity: 0,
            },
            desc: '',
            count: 0,
          }}
          itemIdx={0}
          item={{
            productId: 0,
            quantity: 0,
          }}
        />
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
