import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel.js';
import sampleHotelData from './sampleHotelData.js';

var hotel;

beforeEach(() => {
  hotel = new Hotel(sampleHotelData);
});

describe('Hotel', () => {

  it('Should be an instance of Hotel', () => {
    // console.log(sampleHotelData.bookings)
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('Should have access to customers, bookngs, rooms and roomservice data', () => {
    // console.log('Hotel', hotel.bookings)
    expect(hotel.customers).to.be.an('array');
    expect(hotel.bookings).to.be.an('array');
    expect(hotel.rooms).to.be.an('array');
    expect(hotel.roomService).to.be.an('array');
  });

  it('should turn date from sting to miliseconds', () => {
    expect(hotel.bookings[0]).to.eql({ userID: 4, date: 1571464800000, roomNumber: 5 });
  })

  it('Should be able to find available rooms for a specific date', ()=> {
    expect(hotel.getRoomsAvailable(1570946400000)).to.eql(
      [ { userID: 70, date: 1570946400000, roomNumber: 43 },
        { userID: 91, date: 1570946400000, roomNumber: 15 },
        { userID: 29, date: 1570946400000, roomNumber: 42 },
        { userID: 31, date: 1570946400000, roomNumber: 36 },
        { userID: 30, date: 1570946400000, roomNumber: 16 },
        { userID: 78, date: 1570946400000, roomNumber: 34 },
        { userID: 47, date: 1570946400000, roomNumber: 40 },
        { userID: 70, date: 1570946400000, roomNumber: 48 },
        { userID: 33, date: 1570946400000, roomNumber: 47 },
        { userID: 38, date: 1570946400000, roomNumber: 1 },
        { userID: 36, date: 1570946400000, roomNumber: 50 },
        { userID: 49, date: 1570946400000, roomNumber: 14 },
        { userID: 93, date: 1570946400000, roomNumber: 46 },
        { userID: 43, date: 1570946400000, roomNumber: 38 },
        { userID: 49, date: 1570946400000, roomNumber: 25 },
        { userID: 72, date: 1570946400000, roomNumber: 27 },
        { userID: 68, date: 1570946400000, roomNumber: 30 },
        { userID: 43, date: 1570946400000, roomNumber: 5 },
        { userID: 33, date: 1570946400000, roomNumber: 12 },
        { userID: 11, date: 1570946400000, roomNumber: 26 } ])
  })

  it('Should be able to find how many rooms are available on a specific date', () => {
    expect(hotel.getAmountOfRoomsAvailable(1570946400000)).to.equal(30)
  })

  it('Should be able to show how manys rooms are occupied in a %', () => {
    expect(hotel.getPercentageOfRoomsBooked(1570946400000)).to.equal(40)
  })

  it('Should be able find revenue from booked rooms for a specific day', () => {
    expect(hotel.getRevenueFromBookedRooms(1570946400000)).to.equal(6463)
  })

  it('Should be able get room service for a specific day', () => {
    expect(hotel.getRoomService(1570946400000)).to.eql([{
      userID: 33,
      date: 1570946400000,
      food: 'Handmade Steel Sandwich',
      totalCost: 8.84
    }] )
  })
  
  it('Should be able find revenue from room service for a specific day', () => {
    expect(hotel.getRevenueFromRoomservice(1570946400000)).to.equal(8.84)
  })

  it.only('Should be able find revenue from room service and booked rooms for a specific day', () => {
    expect(hotel.getTotalRevenue(1570946400000)).to.equal(6472)
  })

})