import domUpdates from "./domUpdates";

class Bookings {
  constructor(bookingsData) {
    this.bookingsData = this.changeTimeFormat(bookingsData)
  }

  changeTimeFormat(hotelData) {
    return hotelData.map(item => {
      const newDateFormat = new Date(item.date)
      item.date = newDateFormat.getTime();
      return item
    })
  }

  getBookingDataOfRoomsBooked(date) {
    return this.bookingsData.filter(room => room.date === date)
  }

  getRoomsNotBooked(hotelRooms, date) {
    const bookedRoomNumbers = this.getBookingDataOfRoomsBooked(date).map( booking => {
      return booking.roomNumber
    })
    return hotelRooms.filter(room => !bookedRoomNumbers.includes(room.number) )
  }

  getAmountOfRoomsAvailable(date, hotelRooms) {
    return hotelRooms.length - this.getBookingDataOfRoomsBooked(date).length
  }

  getPercentageOfRoomsBooked(date, hotelRooms) {
    return (this.getBookingDataOfRoomsBooked(date).length / hotelRooms.length) * 100
  }

  getRevenueFromBookedRooms(date, hotelRooms) { // booking Class
    return Math.round(this.getBookingDataOfRoomsBooked(date).map(bookedRoom => bookedRoom.roomNumber).reduce((totalRevenue, roomNumber) => {
      hotelRooms.forEach(room => {
        if (roomNumber === room.number) {
          return totalRevenue += room.costPerNight
        }
      })
      return totalRevenue
    }, 0))
  }

  getBookingDates() {
    return this.bookingsData.reduce((acc, booking) => {
      if (!acc[booking.date]) {
        acc[booking.date] = 0
      }
      acc[booking.date] += 1
      return acc
    }, {})
  }

  getMostBookedDay() {
    const bookingDates = this.getBookingDates()
    const bookingsDailyTotal = Object.values(bookingDates).sort((a, b) => b - a)
    const bookingsDays = Object.keys(bookingDates)
    const mostBookings = bookingsDailyTotal[0]
    const leastBookings = bookingsDailyTotal[bookingsDailyTotal.length - 1]
    const dayWithMostBookings = bookingsDays.filter(day => bookingDates[day] === mostBookings)
    const dayWithleastBookings = bookingsDays.filter(day => bookingDates[day] === leastBookings)
    return [dayWithMostBookings, dayWithleastBookings]
  }

  allBookingsOfCustomer(customer) {
    return this.bookingsData.filter(booking => booking.userID === customer.id)
  }

  findBookingForToday(customer, date) {
    if(this.allBookingsOfCustomer(customer).find( booking => booking.date === date) === undefined) {
      return false
    } else {
      return true
    }
  }

  newBookingOption(customer, date) {
    if (!this.findBookingForToday(customer, date)) {
      this.getBookingDataOfRoomsBooked(date)
      domUpdates.createBookingTool(this.createRoomOptions((this.findRoomTypesForToday(date) ) ) )
    }
  }

  createRoomOptions(availableRooms) {
    console.log(availableRooms)
    return availableRooms.map(room => {
      return `<option value="${room.number}">${room.roomType}</option>`
    })
  }

  findRoomTypesForToday(date) {
    let availableRoomTypes = [];
    const availableRooms = this.getBookingDataOfRoomsBooked(date)
    console.log(this.getBookingDataOfRoomsBooked(date))
    if (availableRooms.find(room => room.roomType === "junior suite") != undefined ) { console.log('this works here!!!!!!!!!!!!!!!!!')}
    if (availableRooms.find(room => room.roomType === "residential suite") != undefined) { console.log('this works here!!!!!!!!!!!!!!!!!')}
    if (availableRooms.find(room => room.roomType === "single room") != undefined ) { console.log('this works here!!!!!!!!!!!!!!!!!')}
    if (availableRooms.find(room => room.roomType === "suite") != undefined ) { console.log('this works here!!!!!!!!!!!!!!!!!')}
    // availableRooms.find(room => room.roomType === "junior suite") != undefined ?  availableRoomTypes.push(availableRooms.find(room => room.roomType === "junior suite")) : null;
    // availableRooms.find(room => room.roomType === "residential suite") != undefined ? availableRoomTypes.push(availableRooms.find(room => room.roomType === "residential suite")) : null;
    // availableRooms.find(room => room.roomType === "single room") != undefined ? availableRoomTypes.push(availableRooms.find(room => room.roomType === "single room")) : null;
    // availableRooms.find(room => room.roomType === "suite") != undefined ? availableRoomTypes.push(availableRooms.find(room => room.roomType === "suite")) : null;
    // console.log(availableRoomTypes)
    let thisStuff = availableRooms.map( room => {
      if (room.roomType === "junior suite") {
        room.roomType = "Junior Suite";
        return room;
      }
      if (room.roomType === "residential suite") {
        room.roomType = "Residential Suite";
        return room;
      }
      if (room.roomType === "single room") {
        room.roomType = "Single Room";
        return room;
      }
      if (room.roomType === "suite") {
        room.roomType = "Suite";
        return room;
      }
    })

    // console.log(thisStuff)
    return thisStuff
  }

}

  export default Bookings