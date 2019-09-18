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
    return  hotelRooms.filter(room => !bookedRoomNumbers.includes(room.number) )
  }

  getAmountOfRoomsAvailable(date, hotelRooms) {
    return hotelRooms.length - this.getBookingDataOfRoomsBooked(date).length
  }

  getPercentageOfRoomsBooked(date, hotelRooms) {
    return ((50 - this.getBookingDataOfRoomsBooked(date).length)/ hotelRooms.length) * 100
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
    if (this.allBookingsOfCustomer(customer).filter( booking => parseInt(booking.date) === date).length > 0) {
      return true
    } else {
      return false
    }
  }

  newBookingOption(customer, date) {
    if (!this.findBookingForToday(customer, date)) {
      domUpdates.createBookingOption(date)
    
    }
  }

  createRoomOptions(availableRooms) {
    return availableRooms.map(room => {
      return `<option value="${room.roomType}">${room.title}</option>`
    })
  }

  findRoomTypesForToday(hotelRooms, date) {
    let availableRoomTypes = [];
    const availableRooms = this.getRoomsNotBooked(hotelRooms, date)  
    const residentialSuite = availableRooms.filter(room => room.roomType === "residential suite") 
    const juniorSuite = availableRooms.filter(room => room.roomType === "junior suite") 
    const suite = availableRooms.filter(room => room.roomType === "suite") 
    const singleRoom = availableRooms.filter(room => room.roomType === "single room") 

    residentialSuite.length > 0 ? availableRoomTypes.push(residentialSuite[0]) : null;
    juniorSuite.length > 0 ?  availableRoomTypes.push(juniorSuite[0]) : null;
    suite.length > 0 ? availableRoomTypes.push(suite[0]) : null;
    singleRoom.length > 0 ? availableRoomTypes.push(singleRoom[0]) : null;

    return availableRoomTypes.map( room => {
      if (room.roomType === "junior suite") {
        room.title = "Junior Suite";
        return room;
      }
      if (room.roomType === "residential suite") {
        room.title = "Residential Suite";
        return room;
      }
      if (room.roomType === "single room") {
        room.title = "Single Room";
        return room;
      }
      if (room.roomType === "suite") {
        room.title = "Suite";
        return room;
      }
    })
  }

  getAvailableRooms(hotelRooms, date, roomType) {
    console.log('getAvailableRooms', this.getRoomsNotBooked(hotelRooms, date).filter(room => room.roomType === roomType)
    )
    return this.getRoomsNotBooked(hotelRooms, date).filter(room => room.roomType === roomType)
  }

  newBooking(roomNumber, hotelRooms, date, currentCustomer) {
    const newBooking = {
      userID: currentCustomer.id,
      date: this.dateTodayMiliseconds(),
      roomNumber: parseInt(roomNumber)
    }
    this.bookingsData.push(newBooking)
    return newBooking
  }

  dateTodayMiliseconds() {
    const date = new Date(Date.now())
    const dateYearMonthDate = `${date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()}`
    const updatedDate = new Date(dateYearMonthDate)
    return updatedDate.getTime();
  }

}

export default Bookings