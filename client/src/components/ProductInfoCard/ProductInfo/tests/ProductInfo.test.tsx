import React from 'react';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ProductInfo from '../ProductInfo';

jest.mock('react-redux');

describe('ProductInfo', () => {
  it('should create empty component', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue('');
    const component = render(
      <BrowserRouter>
        <ProductInfo initialQuantity={0} price={0} currentQuantity={0} discountPercent={0} />
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
