import React from 'react';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ProductPageFooter from '../ProductPageFooter';

jest.mock('react-redux');

describe('Slide', () => {
  it('should create empty component', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue('');
    const component = render(
      <BrowserRouter>
        <ProductPageFooter
          quantityHandler={() => {
          }}
          initialQuantity={0}
          currentQuantity={0}
          quantity={0}
        />
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
