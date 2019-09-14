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

  // getRoomsAvailable(date) { // booking Class
  //   return this.bookings.filter( room => room.date === date)
  // }

  // getAmountOfRoomsAvailable(date) { // booking Class
  //   return this.rooms.length - this.getRoomsAvailable(date).length
  // }

  // getPercentageOfRoomsBooked(date) { // booking Class
  //   return (this.getRoomsAvailable(date).length / this.rooms.length) * 100
  // }

  getTotalRevenue(date) {
    return this.getRevenueFromBookedRooms(date) + this.getRevenueFromRoomservice(date)
  }
  
  // getRevenueFromBookedRooms(date) { // booking Class
  //   return Math.round(this.getRoomsAvailable(date).map(bookedRoom => bookedRoom.roomNumber).reduce((totalRevenue, roomNumber) => { 
  //     this.rooms.forEach( room => {
  //       if (roomNumber === room.number) {
  //         return totalRevenue += room.costPerNight
  //       }
  //     })
  //     return totalRevenue 
  //   }, 0))
  // }

  // getRevenueFromRoomservice(date) { // room service class
  //   return Math.round(this.getRoomService(date).reduce((totalRevenue, item) => {
  //     return totalRevenue += item.totalCost
  //   }, 0))
  // }
  
  // getRoomService(date) { // room service class
  //   return this.roomService.filter(item => item.date === date)
  // }

  // getBookingDates() {
  //   return this.bookings.reduce( (acc, booking) => {
  //     if (!acc[booking.date]) {
  //       acc[booking.date] = 0
  //     }
  //     acc[booking.date] += 1
  //     return acc
  //   }, {})
  // }

}


export default Hotel;

//write function to change time format
