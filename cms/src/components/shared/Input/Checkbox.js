import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as MaterialCheckbox } from '@material-ui/core';
import './Checkbox.scss';

const Checkbox = (props) => {
  return (
    <>
    <MaterialCheckbox
      classes={{root: 'checkbox-default'}}
      checked={props.checked}
      name={props.name}
      onChange={props.onChange}
      color='primary'
    />
    </>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

Checkbox.defaultProps = {
  name: '',
};

export default Checkbox;