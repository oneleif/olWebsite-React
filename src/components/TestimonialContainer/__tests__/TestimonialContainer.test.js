import React from 'react';
import { render } from 'test-utils';

import TestimonialContainer from '../TestimonialContainer';

const TEST = 'test';

describe('Testimonial Container Tests', () => {
  test('Initial render', () => {
    const { queryByText } = render(<TestimonialContainer>{TEST}</TestimonialContainer>);
    expect(queryByText(TEST)).toBeTruthy();
  });
});
