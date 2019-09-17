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

  it('Should be able to get room service over lifetime of customer\'s stays', () => {
    expect(hotel.roomService.getCustomersRoomServiceAllTime(currentCustomer)).to.eql([ { userID: 10,
      date: 1564639200000,
      food: 'Tasty Concrete Sandwich',
      totalCost: 12.01
    } ])
  })

  it('Should be able to get customer\'s room service for a specific day', () => {
    expect(hotel.roomService.getCustomerRoomSeriveForASpecificDay(currentCustomer, 1564639200000)).to.eql([{
      userID: 10,
      date: 1564639200000,
      food: 'Tasty Concrete Sandwich',
      totalCost: 12.01
    }])
  })

  it('Should be able to create an object of just room service item and price as a key value pair', () => {
    expect(hotel.roomService.getRoomServiceMenu()).to.eql([{ food: 'Rustic Concrete Sandwich', totalCost: 14.9 },
    { food: 'Rustic Cotton Sandwich', totalCost: 17.33 },
    { food: 'Tasty Wooden Sandwich', totalCost: 11.15 },
    { food: 'Practical Granite Sandwich', totalCost: 14.87 },
    { food: 'Fantastic Cotton Sandwich', totalCost: 17.61 },
    { food: 'Awesome Cotton Sandwich', totalCost: 20.79 },
    { food: 'Refined Metal Sandwich', totalCost: 12.32 },
    { food: 'Incredible Concrete Sandwich', totalCost: 24.77 },
    { food: 'Unbranded Wooden Sandwich', totalCost: 7.95 },
    { food: 'Intelligent Fresh Sandwich', totalCost: 12.32 },
    { food: 'Handcrafted Rubber Sandwich', totalCost: 22.45 },
    { food: 'Tasty Granite Sandwich', totalCost: 18.73 },
    { food: 'Refined Cotton Sandwich', totalCost: 12.65 },
    { food: 'Handcrafted Metal Sandwich', totalCost: 12.36 },
    { food: 'Rustic Soft Sandwich', totalCost: 6.78 },
    { food: 'Incredible Cotton Sandwich', totalCost: 8.26 },
    { food: 'Awesome Soft Sandwich', totalCost: 9.63 },
    { food: 'Generic Wooden Sandwich', totalCost: 10.63 },
    { food: 'Refined Plastic Sandwich', totalCost: 7.47 },
    { food: 'Rustic Metal Sandwich', totalCost: 14.95 },
    { food: 'Incredible Granite Sandwich', totalCost: 9.28 },
    { food: 'Sleek Steel Sandwich', totalCost: 12.79 },
    { food: 'Generic Cotton Sandwich', totalCost: 21.66 },
    { food: 'Licensed Plastic Sandwich', totalCost: 10.64 },
    { food: 'Generic Plastic Sandwich', totalCost: 18.34 },
    { food: 'Sleek Frozen Sandwich', totalCost: 15.24 },
    { food: 'Rustic Plastic Sandwich', totalCost: 9.94 },
    { food: 'Licensed Cotton Sandwich', totalCost: 14.74 },
    { food: 'Refined Rubber Sandwich', totalCost: 9.89 },
    { food: 'Tasty Soft Sandwich', totalCost: 23.7 },
    { food: 'Ergonomic Metal Sandwich', totalCost: 19.14 },
    { food: 'Licensed Frozen Sandwich', totalCost: 21.75 },
    { food: 'Fantastic Metal Sandwich', totalCost: 21.6 },
    { food: 'Handmade Concrete Sandwich', totalCost: 18.49 },
    { food: 'Handmade Steel Sandwich', totalCost: 8.84 },
    { food: 'Small Cotton Sandwich', totalCost: 22.94 },
    { food: 'Intelligent Granite Sandwich', totalCost: 18.11 },
    { food: 'Practical Fresh Sandwich', totalCost: 21.51 },
    { food: 'Practical Steel Sandwich', totalCost: 15.85 },
    { food: 'Intelligent Wooden Sandwich', totalCost: 19.3 },
    { food: 'Handmade Soft Sandwich', totalCost: 5.32 },
    { food: 'Handcrafted Cotton Sandwich', totalCost: 6.27 },
    { food: 'Small Metal Sandwich', totalCost: 22.75 },
    { food: 'Gorgeous Soft Sandwich', totalCost: 6.65 },
    { food: 'Sleek Metal Sandwich', totalCost: 11.61 },
    { food: 'Generic Metal Sandwich', totalCost: 7.31 },
    { food: 'Small Steel Sandwich', totalCost: 12.6 },
    { food: 'Awesome Metal Sandwich', totalCost: 12.56 },
    { food: 'Unbranded Plastic Sandwich', totalCost: 17.66 },
    { food: 'Fantastic Fresh Sandwich', totalCost: 11.42 },
    { food: 'Sleek Rubber Sandwich', totalCost: 13.13 },
    { food: 'Generic Steel Sandwich', totalCost: 12.14 },
    { food: 'Handcrafted Steel Sandwich', totalCost: 10 },
    { food: 'Ergonomic Wooden Sandwich', totalCost: 24.79 },
    { food: 'Gorgeous Steel Sandwich', totalCost: 18.44 },
    { food: 'Unbranded Concrete Sandwich', totalCost: 22.8 },
    { food: 'Generic Soft Sandwich', totalCost: 12.77 },
    { food: 'Licensed Soft Sandwich', totalCost: 20.09 },
    { food: 'Incredible Plastic Sandwich', totalCost: 21.09 },
    { food: 'Handmade Frozen Sandwich', totalCost: 24.31 },
    { food: 'Intelligent Rubber Sandwich', totalCost: 17.18 },
    { food: 'Gorgeous Concrete Sandwich', totalCost: 24.79 },
    { food: 'Small Plastic Sandwich', totalCost: 5.66 },
    { food: 'Licensed Rubber Sandwich', totalCost: 10.26 },
    { food: 'Refined Granite Sandwich', totalCost: 12 },
    { food: 'Tasty Concrete Sandwich', totalCost: 12.01 },
    { food: 'Practical Concrete Sandwich', totalCost: 11.49 },
    { food: 'Handmade Cotton Sandwich', totalCost: 24.74 },
    { food: 'Licensed Steel Sandwich', totalCost: 24.53 },
    { food: 'Gorgeous Frozen Sandwich', totalCost: 13.28 },
    { food: 'Ergonomic Plastic Sandwich', totalCost: 17.88 },
    { food: 'Awesome Granite Sandwich', totalCost: 18.34 },
    { food: 'Intelligent Steel Sandwich', totalCost: 11.2 },
    { food: 'Practical Frozen Sandwich', totalCost: 24.91 },
    { food: 'Handcrafted Concrete Sandwich', totalCost: 22.63 },
    { food: 'Unbranded Soft Sandwich', totalCost: 20.31 },
    { food: 'Refined Wooden Sandwich', totalCost: 20.52 },
    { food: 'Licensed Metal Sandwich', totalCost: 17.77 },
    { food: 'Licensed Fresh Sandwich', totalCost: 20.84 },
    { food: 'Small Soft Sandwich', totalCost: 12.55 }])
  })

})