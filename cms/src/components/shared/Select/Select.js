import React from 'react';
import PropTypes from 'prop-types';
import RSelect from 'react-select';


const Select = (props) => {
  return (
    <RSelect className='dropdown-input' value={props.value} onChange={props.onChange} options={props.options}/>
  );
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired
};



export default Select;