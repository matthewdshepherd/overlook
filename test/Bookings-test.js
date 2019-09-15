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

describe('Bookings', () => {

  it('Should be an instance of Bookigs', () => {
    expect(bookings).to.be.an.instanceOf(Bookings);
  });

  it('Should have access to bookings data', () => {
    expect(bookings.bookingsData).to.be.an('array');
  });

  it('should turn date from sting to miliseconds', () => {
    expect(bookings.bookingsData[0]).to.eql({ userID: 4, date: 1571464800000, roomNumber: 5 });
  })

  it('Should be able to find available rooms for a specific date', () => {
    expect(bookings.getRoomsAvailable(1570946400000)).to.eql(
      [{ userID: 70, date: 1570946400000, roomNumber: 43 },
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
        { userID: 11, date: 1570946400000, roomNumber: 26 }])
  })

  it('Should be able to find how many rooms are available on a specific date', () => {
    expect(bookings.getAmountOfRoomsAvailable(1570946400000, hotel.rooms)).to.equal(30)
  })

  it('Should be able to show how manys rooms are occupied in a %', () => {
    expect(bookings.getPercentageOfRoomsBooked(1570946400000, hotel.rooms)).to.equal(40)
  })

  it('Should be able find revenue from booked rooms for a specific day', () => {
    expect(bookings.getRevenueFromBookedRooms(1570946400000, hotel.rooms)).to.equal(6463)
  })

  it.only('should be able to create an object with dates and amount of bookings', () => {
    console.log(bookings.doSomeThings())

  })

  it('Should be able to return an object of dates and amount of bookings that day has', () => {
    // console.log(bookings.getBookingDates())
    expect(bookings.getBookingDates()).to.eql({
      '1571464800000': 12,
      '1572415200000': 18,
      '1567317600000': 18,
      '1566972000000': 22,
      '1565935200000': 23,
      '1567663200000': 15,
      '1572328800000': 21,
      '1566885600000': 24,
      '1569477600000': 26,
      '1569564000000': 20,
      '1569736800000': 19,
      '1567058400000': 17,
      '1567749600000': 20,
      '1567144800000': 20,
      '1564120800000': 19,
      '1565244000000': 16,
      '1571378400000': 19,
      '1567576800000': 21,
      '1570428000000': 19,
      '1565589600000': 21,
      '1564725600000': 23,
      '1564207200000': 19,
      '1569823200000': 19,
      '1564466400000': 19,
      '1571292000000': 20,
      '1570773600000': 25,
      '1564639200000': 19,
      '1565330400000': 22,
      '1566021600000': 16,
      '1564984800000': 17,
      '1570687200000': 16,
      '1565503200000': 21,
      '1571724000000': 26,
      '1572501600000': 12,
      '1564034400000': 20,
      '1566280800000': 12,
      '1568354400000': 17,
      '1569304800000': 23,
      '1572242400000': 27,
      '1568872800000': 18,
      '1570946400000': 20,
      '1571983200000': 19,
      '1568440800000': 20,
      '1569391200000': 20,
      '1566194400000': 15,
      '1567490400000': 17,
      '1566626400000': 22,
      '1570600800000': 19,
      '1568181600000': 21,
      '1570514400000': 17,
      '1571032800000': 16,
      '1564552800000': 26,
      '1567922400000': 18,
      '1567836000000': 27,
      '1569045600000': 13,
      '1566540000000': 25,
      '1567231200000': 22,
      '1563861600000': 10,
      '1568008800000': 17,
      '1564380000000': 18,
      '1568959200000': 22,
      '1568527200000': 23,
      '1564898400000': 20,
      '1569996000000': 19,
      '1565071200000': 25,
      '1563948000000': 18,
      '1569132000000': 24,
      '1566367200000': 18,
      '1569218400000': 22,
      '1571896800000': 22,
      '1570341600000': 23,
      '1568700000000': 17,
      '1566108000000': 22,
      '1568613600000': 26,
      '1564812000000': 23,
      '1565762400000': 18,
      '1571551200000': 20,
      '1571205600000': 21,
      '1572069600000': 23,
      '1567404000000': 20,
      '1565676000000': 19,
      '1565157600000': 16,
      '1570255200000': 21,
      '1572156000000': 20,
      '1570860000000': 17,
      '1566453600000': 18,
      '1566712800000': 18,
      '1568786400000': 18,
      '1570168800000': 21,
      '1568095200000': 21,
      '1564293600000': 16,
      '1570082400000': 16,
      '1568268000000': 20,
      '1569909600000': 18,
      '1571637600000': 24,
      '1569650400000': 23,
      '1571119200000': 20,
      '1566799200000': 21,
      '1571810400000': 27,
      '1565848800000': 16,
      '1565416800000': 22
    })
  })
 
  it('Should be able to return the day with the most bookngs', () => {
    expect(bookings.getMostBookedDay()).to.eql({
      dayWithMostBookings: ['1572242400000', '1567836000000', '1571810400000'],
      dayWithleastBookings: ['1563861600000']
    })
  })

})