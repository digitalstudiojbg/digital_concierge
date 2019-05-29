import React from 'react';
import './CheckInOut.scss'
import { Autocomplete, Input, DatePicker, TimePicker } from "../../components/shared/Input";
import Select from "../../components/shared/Select/Select";
import PhoneBlock from "../../components/guests/PhoneBlock";

const STATUSES = [
  {label: 'Check in', value: 'checkIn'},
  {label: 'Check out', value: 'checkOut'},
  ];

class CheckInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autocomplete: '',
      firstName: '',
      surname: '',
      guestId: '',
      roomId: '',
      peopleCount: 1,
      email: '',
      firstArea: '',
      secondArea: '',
      firstNumber: '',
      secondNumber: '',
      checkInDate: Date.now(),
      checkInTime: Date.now(),
      checkOutDate: Date.now(),
      checkOutTime: Date.now(),
    };
  }

  handleState = (name, value) => {
    this.setState({
      [name]: value
    })
  };


  handleAutocomplete = (value) => {
    this.handleState('autocomplete', value);
  };


  handleGuestFormInput = (event) => {
    const { name, value } = event.target;
    this.handleState(name, value)
  };

  handleCheckInDate = (value) => {
    this.handleState('checkInDate', value);
  };

  handleCheckInTime = (value) => {
    this.handleState('checkInTime', value);
  };

  handleCheckOutDate = (value) => {
    this.handleState('checkOutDate', value);
  };

  handleCheckOutTime = (value) => {
    this.handleState('checkOutTime', value);
  };

  handleBookingStatus = (value) => {
    this.handleState('bookingStatus', value);
  };

  render() {
    return (
      <div className='container'>
        <div className='row header'>
          <div className='row'>
            <div className='column stretch'>
                <h1 className='section-name check-in'>Guest Check In</h1>
            </div>
            <div className='column stretch info-box-container'>
              <div className='dot info-box'><span>i</span></div>
            </div>
          </div>
          <div className='row'>
            <div className='column'>
              <Autocomplete
                label={'Search guest register'}
                options={[]}
                onChange={this.handleAutocomplete}
                value={this.state.autocomplete}
              />
            </div>
          </div>
        </div>
        <div className='row form'>
          <div className='row section'>
            <div className='column'><h2>Guest info</h2></div>
            <div className='column'><h2>Check in</h2></div>
          </div>
          <div className='row'>
            <div className='column'>
              <div className='row'>
                <div className='column medium medium-margin'>
                  <Input
                    type='text'
                    name='guestId'
                    label='Guest ID Number'
                    value={this.state.guestId}
                    onChange={this.handleGuestFormInput}
                  />
                </div>
                <div className='column small'>
                  <Input
                    type='number'
                    name='roomId'
                    label='Room Number'
                    onChange={this.handleGuestFormInput}
                    value={this.state.roomId}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='column small'>
                  <Input
                    type='number'
                    name='peopleCount'
                    label='Number of people'
                    onChange={this.handleGuestFormInput}
                    value={this.state.peopleCount}
                  />
                </div>
            </div>
          </div>
            <div className='column'>
              <div className='row'>
                <div className='column'>
                  <DatePicker
                    label='Check-in date'
                    value={this.state.checkInDate}
                    onChange={this.handleCheckInDate}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='column'>
                  <TimePicker
                    label='Check-in time'
                    value={this.state.checkInTime}
                    onChange={this.handleCheckInTime}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row section end-section'>
            <div className='column'><h2>Reservation details</h2></div>
            <div className='column'><h2 >Check out</h2></div>
          </div>
          <div className='row'>
            <div className='column'>
              <Input
                type='text'
                name='firstName'
                label='First name'
                onChange={this.handleGuestFormInput}
                value={this.state.firstName}
              />
            </div>
            <div className='column'>
              <DatePicker
                label='Check-out date'
                value={this.state.checkOutDate}
                onChange={this.handleCheckOutDate}
              />
            </div>
          </div>
          <div className='row'>
            <div className='column'>
              <Input
                type='text'
                name='surname'
                label='Surname'
                onChange={this.handleGuestFormInput}
                value={this.state.surname}
              />
            </div>
            <div className='column'>
              <TimePicker
                label='Check-out time'
                value={this.state.checkInTime}
                onChange={this.handleCheckOutTime}
              />
            </div>
          </div>
          <div className='row'>
            <div className='column'>
              <div className='row'>
                <div className='column'>
                  <div className='row'>
                    <div className='column'>
                      <PhoneBlock
                        name='first'
                        header='Contact number #1'
                        area={this.state.firstArea}
                        number={this.state.firstNumber}
                        onAreaChange={this.handleGuestFormInput}
                        onNumberChange={this.handleGuestFormInput}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='column'>
                      <PhoneBlock
                        name='second'
                        header='Contact number #2'
                        area={this.state.secondArea}
                        number={this.state.secondNumber}
                        onAreaChange={this.handleGuestFormInput}
                        onNumberChange={this.handleGuestFormInput}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='column section'>
              <div className='row end-section'>
                <div className='column'>
                  <h2>Booking status</h2>
                </div>
                <div className='row end-section'>
                  <div className='column'>
                    <Select value={this.state.bookingStatus} onChange={this.handleBookingStatus} options={STATUSES}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='column'>
              <Input
              name='email'
              label='Contact Email'
              onChange={this.handleGuestFormInput}
              value={this.state.email}/>
            </div>
            <div className='column'>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckInPage;