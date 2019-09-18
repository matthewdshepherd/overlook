class RoomService {
  constructor(roomServiceData) {
    this.roomServiceData = this.changeTimeFormat(roomServiceData)
    this.getRoomServiceMenu;
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

    const menu = roomServiceKeys.map( (item, i) => {
      return { food: item, totalCost: roomServiceValues[i]}
    })

    this.getRoomServiceMenu = menu;
    return menu
  }

  createOrderOptions() {
    return this.getRoomServiceMenu.map(item => {
      return `<option value="${item.food}" class="${item.totalCost}">${item.food}</option>`
    })
  }

  newRoomServiceOrder(foodItem, currentCustomer, dateToday) {
    const foodPrice = this.getFoodItemPrice(foodItem)
    const newOrder = {
      userID: parseInt(currentCustomer.id),
      date: dateToday,
      food: foodPrice.food,
      totalCost: Number.parseFloat(foodPrice.totalCost).toFixed(2)
    }
    this.roomServiceData.push(newOrder)
    return newOrder
  }

  getFoodItemPrice(foodItem){
    return this.getRoomServiceMenu.find( item => item.food === foodItem)
  }

//   {
//   userID: 1,
//     date: "2019/09/28",
//       food: "Refined Rubber Sandwich",
//         totalCost: 9.89
// }

}

export default RoomService