import React from 'react';
import PropTypes from 'prop-types';
import DateIcon from '@material-ui/icons/CalendarTodayOutlined'
import { Button } from '@material-ui/core';
import { DatePicker as MaterialDatePicker } from "@material-ui/pickers";
import Checkbox from './Checkbox';
import './Pickers.scss';

class TimePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isCurrentDate: false,
    };
  }

  toggleOpen = () => {
    this.setState(prevState => {
      return {
        isOpen: !prevState.isOpen,
      }
    })
  };

  onChange = (value) => {
    this.toggleOpen();
    this.props.onChange(value);
  };

  toggleCurrentDate = () => {
    this.setState(prevState => {
      return {
        isCurrentDate: !prevState.isCurrentDate,
      }
    }, () => {
      if(this.state.isCurrentDate) {
        this.props.onChange(Date.now());
      }
    });
  };

  render() {
    return (
      <div className='row align-end'>
        <div className='column large'>
          <label>{this.props.label}</label>
          <MaterialDatePicker
            disabled
            inputVariant='outlined'
            onAccept={this.toggleOpen}
            onClose={this.toggleOpen}
            onCancel={this.toggleOpen}
            onError={this.toggleOpen}
            open={this.state.isOpen}
            value={this.props.value}
            onChange={this.onChange}
          />
        </div>
        <div className='column picker-button-margin'>
          <Button onClick={this.toggleOpen} className='date-picker-button'><DateIcon/></Button>
        </div>
        <div className='column'>
          <Checkbox checked={this.state.isCurrentDate} onChange={this.toggleCurrentDate}/>
        </div>
      </div>
    );
  }
}

export default TimePicker;