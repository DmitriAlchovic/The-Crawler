import React from 'react';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Slide from '../Slide';

jest.mock('react-redux');

describe('Slide', () => {
  it('should create empty component', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue('');
    const component = render(
      <BrowserRouter>
        <Slide
          productId={0}
          index={0}
          sliderIndex={0}
          discount={{
            name: '',
            discountPercent: 0,
          }}
          name=""
          price={0}
          gallery=""
        />
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
