import React from 'react';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CategoryCard from '../CategoryCard';

jest.mock('react-redux');

describe('CategoryCard', () => {
  it('should create empty component', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue('');
    const component = render(
      <BrowserRouter>
        <CategoryCard
          category={{
            name: '',
            image: '',
            items: 0,
          }}
          index={0}
          sliderIndex={0}
          sliderSize={0}
        />
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
