import React from 'react';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ProductCardLoader from '../ProductCardLoader';

jest.mock('react-redux');

describe('ProductCardLoader', () => {
  it('should create empty component', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue('');
    const component = render(
      <BrowserRouter>
        <ProductCardLoader cardCount={0} />
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
