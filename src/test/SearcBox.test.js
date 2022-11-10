import React from 'react';
import SearchBox from '../components/SearchBox.js';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer
        .create(<SearchBox/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});