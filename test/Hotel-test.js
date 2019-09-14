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
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('Should have access to customers and rooms', () => {
    expect(hotel.customers).to.be.an('array');
    expect(hotel.rooms).to.be.an('array');
  });

 
})