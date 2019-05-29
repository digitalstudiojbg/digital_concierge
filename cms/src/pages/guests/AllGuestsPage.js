import React from 'react';
import dayjs from 'dayjs';
import classnames from 'classnames';
import './AllGuestsPage.scss';
import { Checkbox } from "../../components/shared/Input";
import { Menu, MenuItem, Button, Tabs, Tab } from '@material-ui/core'


const users = [
  {
    name: 'Don Bruce',
    id: '1151',
    peopleCount: 2,
    checkedIn: dayjs().format('H:mm DD MMM YYYY'),
    checkedOut: dayjs().format('H:mm DD MMM YYYY'),
    totalNights: 2,
    room: '02',
    deviceStatus: false,
    bookingStatus: 'Checked in',
  }
];

class AllGuestsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedCheckbox: {},
      menuEl: null
    }
  }

  toggleCheckbox = (userId) => {
    let state = true;
    if(this.state.checkedCheckbox[userId]) {
      state = false;
    }
    this.setState({
      checkedCheckbox: {
        [userId]: state
      }
    })
  };

  handleMenuOpen = (event) => {
    this.setState({ menuEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuEl: null });
  };

  render() {
    return (
      <div className='container'>
        <div className='header'>
          <div className='row'>
            <div className='column stretch'>
                <h1 className='section-name'>Guests</h1>
            </div>
            <div className='column stretch info-box-container'>
              <div className='dot info-box'><span>i</span></div>
            </div>
          </div>
          <div className='row control-container'>
            <div className='column align-start tabs'>
              <Tabs classes={{indicator: 'tabs-indicator'}} value={0}>
                <Tab classes={{selected: 'tab-selected'}} label='Current guests'/>
                <Tab disabled label='Device calendar'/>
                <Tab disabled label='Guest register'/>
              </Tabs>
            </div>
            <div className='column stretch'>
              <Button className='control-button'>Add booking</Button>
            </div>
            <div className='column stretch'>
              <Button className='control-button'>Check-in</Button>
            </div>
            <div className='column stretch'>
              <Button className='control-button'>Check-out</Button>
            </div>
          </div>
        </div>
        <div className='table'>
          <div className='row table-head'>
            <div className='column'><span>Guest Name</span></div>
            <div className='column'><span>Guest id</span></div>
            <div className='column'><span># People</span></div>
            <div className='column'><span>Checked in @</span></div>
            <div className='column'><span>Checked out @</span></div>
            <div className='column'><span>Total nights</span></div>
            <div className='column'><span>Room #</span></div>
            <div className='column'><span>Device status</span></div>
            <div className='column'><span>Booking status</span></div>
            <div className='column flex-3'><span>Actions</span></div>
            <div className='column'><span/></div>
          </div>
          {
            users.map((user) => {
              return (
                <div key={user.id} className='row table-row'>
                  <div className='column'><span>{user.name}</span></div>
                  <div className='column'><span>{user.id}</span></div>
                  <div className='column'><span>{user.peopleCount}</span></div>
                  <div className='column'><span>{user.checkedIn}</span></div>
                  <div className='column'><span>{user.checkedOut}</span></div>
                  <div className='column'><span>{user.totalNights}</span></div>
                  <div className='column'><span>{user.room}</span></div>
                  <div className='column'><span className={classnames('dot', {green: user.deviceStatus})}/></div>
                  <div className='column'><span>{user.bookingStatus}</span></div>
                  <div className='column flex-3'>
                    <Button
                      aria-owns={this.state.menuEl ? 'simple-menu' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleMenuOpen}
                    >
                      ...
                    </Button>
                      <Menu id="simple-menu" anchorEl={this.state.menuEl} open={Boolean(this.state.menuEl)} onClose={this.handleMenuClose}>
                        <MenuItem onClick={this.handleMenuClose}>Check out</MenuItem>
                        <MenuItem onClick={this.handleMenuClose}>Edit</MenuItem>
                      </Menu>                  </div>
                  <div className='column'>
                      <Checkbox onChange={() => this.toggleCheckbox(user.id)} checked={this.state.checkedCheckbox[user.id]}/>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default AllGuestsPage;