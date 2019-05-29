import React from 'react';
import PropTypes from 'prop-types';
import {Input} from "../shared/Input";

const PhoneBlock = (props) => {
  return (
    <>
    <div className='row'>
      <div className='column'>
        <h5>{props.header}</h5>
      </div>
    </div>
      <div className='row'>
        <div className='column small small-margin'>
          <Input type='number' name={`${props.name}Area`} label='Area' onChange={props.onAreaChange} value={props.area}/>
        </div>
        <div className='column'>
          <Input type='number' name={`${props.name}Number`} label='Number' onChange={props.onNumberChange} value={props.number}/>
        </div>
      </div>
    </>
  );
};

PhoneBlock.propTypes = {
  header: PropTypes.string.isRequired,
  area: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  onAreaChange: PropTypes.func.isRequired,
  onNumberChange: PropTypes.func.isRequired,
};

export default PhoneBlock;