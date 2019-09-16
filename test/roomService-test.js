import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel.js';
// import Bookings from '../src/Booking.js';
// import RoomService from '../src/RoomService.js';
import sampleHotelData from './sampleHotelData.js';

var hotel, currentCustomer;

beforeEach(() => {
  hotel = new Hotel(sampleHotelData)
  currentCustomer = {
    "id": 10,
    "name": "Chyna Gulgowski"
  }
});

describe('RoomService', () => {
  it('Should be an instance of RoomService', () => {
    expect(hotel.roomService).to.be.an.instanceOf(RoomService);
  });

  it('Should have access to roomservice data', () => {
    expect(hotel.roomService.roomServiceData).to.be.an('array');
  });

  it('should turn date from sting to miliseconds', () => {
    expect(hotel.roomService.roomServiceData[0]).to.eql({ userID: 14,
      date: 1564380000000,
      food: 'Rustic Concrete Sandwich',
      totalCost: 14.9 });
  })

  it('Should be able get room service for a specific day', () => {
    expect(hotel.roomService.getRoomService(1570946400000)).to.eql([{
      userID: 33,
      date: 1570946400000,
      food: 'Handmade Steel Sandwich',
      totalCost: 8.84
    }])
  })

  it('Should be able find revenue from room service for a specific day', () => {
    expect(hotel.roomService.getRevenueFromRoomservice(1570946400000)).to.equal(8.84)
  })

  it.only('Should be able to get room service over lifetime of customer\'s stays', () => {
    expect(hotel.roomService.getCustomersRoomServiceAllTime(currentCustomer)).to.eql([ { userID: 10,
      date: 1564639200000,
      food: 'Tasty Concrete Sandwich',
      totalCost: 12.01
    } ])
  })

  it.only('Should be able to get customer\'s room service for a specific day', () => {
    expect(hotel.roomService.getCustomerRoomSeriveForASpecificDay(currentCustomer, 1564639200000)).to.eql([{
      userID: 10,
      date: 1564639200000,
      food: 'Tasty Concrete Sandwich',
      totalCost: 12.01
    }])
  })

})