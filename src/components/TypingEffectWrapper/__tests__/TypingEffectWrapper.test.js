import React from 'react';
import TypingEffectWrapper from '../TypingEffectWrapper';
import { render } from 'test-utils';

const PREFIX = 'We';

describe('Typing Effect Wrapper Tests', function() {
  test('Initial render', () => {
    const { queryByText } = render(
      <TypingEffectWrapper
        prefix={PREFIX}
        textEffected={[' learn together', ' work together', ' grow together', ' create together']}
      />
    );
    expect(queryByText(PREFIX)).toBeTruthy();
  });
});
