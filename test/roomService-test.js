import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel.js';
import Bookings from '../src/Booking.js';
import RoomService from '../src/RoomService.js';
import sampleHotelData from './sampleHotelData.js';

var hotel, bookings, roomService;

beforeEach(() => {
  hotel = new Hotel(sampleHotelData)
  bookings = new Bookings(sampleHotelData.bookings);
  roomService = new RoomService(sampleHotelData.roomService);
});

describe('RoomService', () => {
  it('Should be an instance of RoomService', () => {
    expect(roomService).to.be.an.instanceOf(RoomService);
  });

  it('Should have access to roomservice data', () => {
    expect(roomService.roomServiceData).to.be.an('array');
  });

  it('should turn date from sting to miliseconds', () => {
    expect(roomService.roomServiceData[0]).to.eql({ userID: 14,
    date: 1564380000000,
    food: 'Rustic Concrete Sandwich',
    totalCost: 14.9 });
  })

  it('Should be able get room service for a specific day', () => {
    expect(roomService.getRoomService(1570946400000)).to.eql([{
      userID: 33,
      date: 1570946400000,
      food: 'Handmade Steel Sandwich',
      totalCost: 8.84
    }])
  })

  it('Should be able find revenue from room service for a specific day', () => {
    expect(roomService.getRevenueFromRoomservice(1570946400000)).to.equal(8.84)
  })
})