import React from 'react';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ProductPageHeader from '../ProductPageHeader';

jest.mock('react-redux');

describe('ProductPageHeader', () => {
  it('should create empty component', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue('');
    const component = render(
      <BrowserRouter>
        <ProductPageHeader categoryName="" productName="" discountPercent={0} price={0} />
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
