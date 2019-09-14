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

  getRevenueFromRoomservice(date) { // room service class
    return this.getRoomService(date).reduce((totalRevenue, item) => {
      return totalRevenue += item.totalCost
    }, 0)
  }

  getRoomService(date) { // room service class
    return this.roomServiceData.filter(item => item.date === date)
  }

}

export default RoomService