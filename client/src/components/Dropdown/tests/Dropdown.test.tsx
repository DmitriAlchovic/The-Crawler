import React from 'react';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Dropdown from '../Dropdown';

jest.mock('react-redux');

describe('Dropdown', () => {
  it('should create empty component', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue('');
    const component = render(
      <BrowserRouter>
        <Dropdown hasChildrenClose={false}>
          <div />
        </Dropdown>
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
