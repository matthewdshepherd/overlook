// import domUpdates from "./domUpdates";
import Bookings from './Booking';
import RoomService from './roomService';

class Hotel {
  constructor(allHotelData) {
    this.customers = allHotelData.customers;
    this.bookings = new Bookings(allHotelData.bookings);
    this.rooms = allHotelData.rooms;
    this.roomService = new RoomService(allHotelData.roomService);
    this.currentCustomer;
  }

  changeTimeFormat(hotelData) {
    return hotelData.map( item => {
      const newDateFormat = new Date(item.date)
      item.date = newDateFormat.getTime();
      return item
    })
  }

  getTotalRevenue(date) {
    return this.getRevenueFromBookedRooms(date) + this.getRevenueFromRoomservice(date)
  }

}


export default Hotel;

//write function to change time format
