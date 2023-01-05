import React from 'react';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu';

jest.mock('react-redux');

describe('ProfileMenu', () => {
  it('should create empty component', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue('');
    const component = render(
      <BrowserRouter>
        <ProfileMenu />
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
