import React from 'react';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CardSlider from '../CardSlider';

jest.mock('react-redux');

describe('CardSlider', () => {
  it('should create empty component', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue('');
    const component = render(
      <BrowserRouter>
        <CardSlider
          index={0}
          title=""
          selection={null}
          activeCategory=""
          sliderHandler={() => {}}
          categoryHandler={() => {}}
          sliderSize={0}
          cardsCount={0}
        >
          <div />
        </CardSlider>
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
