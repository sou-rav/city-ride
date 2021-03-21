import React from 'react';
import fakeData from '../../fakeData/data.json'

const SearchRider = () => {

  return (
    <div>
      <form action="submit">
        <h3>Pick From</h3>
      <input type="text" />
      <h3>Pick To</h3>
        <input type="text" />
        <br/>
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchRider;