import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import './Input.scss';

const Input = (props) => {
  return (
    <>
    <label htmlFor={props.id}>{props.label}</label>
      <TextField
        id={props.id}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        disabled={props.disabled}
        autoFocus={props.disabled}
        multiline={props.multiline}
        placeholder={props.placeholder}
        required={props.required}
        value={props.value}
        fullWidth={true}
        variant="outlined"
      />
    </>
  );
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.oneOf(['email', 'password', 'text', 'number'])
};

Input.defaultProps = {
  disabled: false,
  autoFocus: false,
  label: null,
  multiline: false,
  placeholder: null,
  required: false,
  name: null,
  type: 'text'
};

export default Input;