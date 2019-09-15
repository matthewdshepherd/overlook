// import domUpdates from "./domUpdates";

class Hotel {
  constructor(allHotelData) {
    this.customers = allHotelData.customers;
    // this.bookings = this.changeTimeFormat(allHotelData.bookings);
    this.rooms = allHotelData.rooms;
    // this.roomService = new RoomService(allHotelData.roomService);
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
