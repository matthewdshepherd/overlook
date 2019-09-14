// import domUpdates from "./domUpdates";

class Hotel {
  constructor(allHotelData) {
    this.customers = allHotelData.customers;
    this.bookings = this.changeTimeFormat(allHotelData.bookings);
    this.rooms = allHotelData.rooms;
    this.roomService = this.changeTimeFormat(allHotelData.roomService);
  }

  changeTimeFormat(hotelData) {
    return hotelData.map( item => {
      const newDateFormat = new Date(item.date)
      item.date = newDateFormat.getTime();
      return item
    })
  }

  getRoomsAvailable(date) {
    return this.bookings.filter( room => room.date === date)
  }

  getAmountOfRoomsAvailable(date) {
    return this.rooms.length - this.getRoomsAvailable(date).length
  }

  getPercentageOfRoomsBooked(date) {
    return (this.getRoomsAvailable(date).length / this.rooms.length) * 100
  }

  getTotalRevenue(date) {
    return this.getRevenueFromBookedRooms(date) + this.getRevenueFromRoomservice(date)
  }
  
  getRevenueFromBookedRooms(date) {
    return Math.round(this.getRoomsAvailable(date).map(bookedRoom => bookedRoom.roomNumber).reduce((totalRevenue, roomNumber) => { 
      this.rooms.forEach( room => {
        if (roomNumber === room.number) {
          return totalRevenue += room.costPerNight
        }
      })
      return totalRevenue 
    }, 0))
  }

  getRevenueFromRoomservice(date) {
    return Math.round(this.getRoomService(date).reduce((totalRevenue, item) => {
      return totalRevenue += item.totalCost
    }, 0))
  }
  
  getRoomService(date) {
    return this.roomService.filter(item => item.date === date)
  }

}

export default Hotel;

//write function to change time format
