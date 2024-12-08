/* eslint-disable react/prop-types */

import { TextInput } from '@mantine/core';

const SearchBar = ({ onSearch }) => (
  <TextInput
    placeholder="Search for books..."
    size="md"
    onChange={(e) => onSearch(e.target.value)}
  />
);

export default SearchBar;
