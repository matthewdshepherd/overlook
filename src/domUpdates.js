import $ from "jquery";

export default {
  
  showFirstTabByDefault() {
    $('.tabs-stage div').hide();
    $('.tabs-stage div:first').show();
    $('.tabs-nav div:first').addClass('tab-active');
  },

  appendDateToPage(date) {
    $('.date--today').text(date)
  },

  appendAvailableRoomsToDashboard(numberOfRoomsAvail) {
    $('.dashboard__text--roomsavil').text(numberOfRoomsAvail)
  },
  
  appendPercentageOfBookedRooms(percentOfRoomsBooked) {
    $('.dashboard__text--percentbooked').text(percentOfRoomsBooked)
  },

  appendTotalRevenue(totalrevenue) {
    $('.dashboard__text--totalrevenue').text(totalrevenue)
  },

  appendAllRoomService(allRoomService) {
    allRoomService.forEach( order => {
      $('.orders__text').after(`
      <div class="orders--item">
      <p>Customer ID: ${order.userID}</p>
      <p>Item: ${order.food}</p>
      <p>Price: ${order.totalCost}</p>
      </div>
      `)
    })
  },

  appendPopularBookingDates(dates) {
    const mostPopularDates = dates[0].map( day => new Date(parseInt(day)).toString().split(' ').splice(0, 4).join(' '))
    const leasstPopularDates = dates[1].map(day => new Date(parseInt(day)).toString().split(' ').splice(0, 4).join(' '))
    mostPopularDates.forEach( date => {
      $('.bookings__text--mostpop').append(
      `<span class="mostpop">${date} | </span>`
      )
    })
    leasstPopularDates.forEach(date => {
      $('.bookings__text--leastpop').append(
        `<span class="leastpop">${date} | </span>`
      )
    })
  },

  appendCustomerSearch(customer) {
    console.log(customer.name)
    $('.customer--search--results').append(
     `<input class="customer--result" type="button" data-id="${customer.id}" value="${customer.name}">`
    )
  }

}
