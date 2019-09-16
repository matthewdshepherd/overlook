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

  getRoomsAvailable(date) {
    return this.bookingsData.filter(room => room.date === date)
  }

  getAmountOfRoomsAvailable(date, hotelRooms) {
    return hotelRooms.length - this.getRoomsAvailable(date).length
  }

  getPercentageOfRoomsBooked(date, hotelRooms) {
    return (this.getRoomsAvailable(date).length / hotelRooms.length) * 100
  }

  getRevenueFromBookedRooms(date, hotelRooms) { // booking Class
    return Math.round(this.getRoomsAvailable(date).map(bookedRoom => bookedRoom.roomNumber).reduce((totalRevenue, roomNumber) => {
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
}

  export default Bookings