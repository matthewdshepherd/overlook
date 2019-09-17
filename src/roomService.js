class RoomService {
  constructor(roomServiceData) {
    this.roomServiceData = this.changeTimeFormat(roomServiceData)
  }

  changeTimeFormat(hotelData) {
    return hotelData.map(item => {
      const newDateFormat = new Date(item.date)
      item.date = newDateFormat.getTime();
      return item
    })
  }

  getRevenueFromRoomservice(date) {
    return this.getRoomService(date).reduce((totalRevenue, item) => {
      return totalRevenue += item.totalCost
    }, 0)
  }

  getRoomService(date) {
    return this.roomServiceData.filter(item => item.date === date)
  }

  // - Total $$ spent for a specific day for Room Service
  getCustomersRoomServiceAllTime(currentCustomer) {
    return this.roomServiceData.filter(item => item.userID === currentCustomer.id)
  }

  getTotalSpendOnRoomService(currentCustomer) {
    return this.getCustomersRoomServiceAllTime(currentCustomer).reduce( (total, meal) => {
      return total += meal.totalCost
    }, 0)
  }

  getCustomerRoomSeriveForASpecificDay(currentCustomer, date) {
    return this.roomServiceData.filter(item => item.userID === currentCustomer.id)
  }

  getRoomServiceMenu() {
    const roomService = this.roomServiceData.reduce( (acc, order) => {
      if (!acc[order.food]) {
        acc[order.food] = order.totalCost
      }
      return acc
    }, {})
    const roomServiceKeys = Object.keys(roomService)
    const roomServiceValues = Object.values(roomService)

    return roomServiceKeys.map( (item, i) => {
      return { food: item, totalCost: roomServiceValues[i]}
    })
  }

  

}

export default RoomService