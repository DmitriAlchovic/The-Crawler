import React from 'react';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CategoryCardLoader from '../CategoryCardLoader';

jest.mock('react-redux');

describe('CategoryCardLoader', () => {
  it('should create empty component', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue('');
    const component = render(
      <BrowserRouter>
        <CategoryCardLoader cardsCount={0} />
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
