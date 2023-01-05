import React from 'react';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import RegisterLoginCard from '../RegisterLoginCard';

jest.mock('react-redux');

describe('RegisterLoginCard', () => {
  it('should create empty component', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue('');
    const component = render(
      <BrowserRouter>
        <RegisterLoginCard hasDefaultLogin={false} />
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
