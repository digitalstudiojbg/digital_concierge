import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const Autocomplete = (props) => {
  return (
    <>
      <label>{props.label}</label>
    <Select
      className='dropdown-input'
      value={props.value}
      onChange={props.onChange}
      options={props.options}
      placeholder={props.placeholder}
    />
    </>
  );
};

Autocomplete.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

Autocomplete.defaultProps = {
  placeholder: null,
};

export default Autocomplete;