import $ from "jquery";
import Hotel from './Hotel';

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
    $('.customer--search--results').append(
      `<input class="customer--result" type="button" data-id="${customer.id}" value="${customer.name}">`
    )
  },

  appendCurrentCusomterNameToDom(name){
    $('.current--customer--name').text(name.name)
  },

  buildAddCustomerInputField() {
    $('.customer--create').append(
      `<input class="customer--create--input" type="text" placeholder="ENTER NEW GUEST'S NAME">`
    )
    $('.customer--create__buttton').prop('disabled', true)
  },

  removeNewCustomerInput() {
    $('.customer--create--input').focusout().remove()
  },

  removeCustomerNewBookingInput() {
    $('.create--customer--booking__input').focusout().remove()
  },

  activateAddNewCustomerButton() {
    $('.customer--create__buttton').prop('disabled', false)
  },

  focusInNewCustomerInputField() {
    $('.customer--create--input')
      .focus()
      .select()
  },

  selectCustomerFromSearchField() {
    if ($('.customer--result')[1]) {
      $('.customer--result')[0]
        .focus()
    } else (
      $('.customer--result')
        .focus()
        .select()
    )
  },

  appendCustomerBookingsToDOM(bookings) {
    $('.current--customer--bookings__div').remove()
    bookings.forEach(booking => {
      $('.current--customer--bookings').append(
        `<container class="current--customer--bookings__div">
        <p class="current--customer--bookings--roomNum">Room Number #: ${booking.roomNumber}</p>
        <p class="current--customer--bookings--date">Date: ${new Date(parseInt(booking.date)).toString().split(' ').splice(0, 4).join(' ')}</p>
        </container>`
      )
    })
  },

  createBookingOption(date) {
    $('.bookings--tool').append(`<p>No Rooms Booked for ${new Date(parseInt(date)).toString().split(' ').splice(0, 4).join(' ')}</p><input class="create--customer--booking__input" type="button" value="Book a room">`)
  },

  createBookingTool(availableRooms) {
    $('.create--customer--booking__input').prop('disabled', true)
    $('.create--customer--booking__input').after(
      `<select id="select--room--type" class="room-selector">
      ${availableRooms}
      </select>`
    )
  },

  createBookingSelectButton() {
    $('.room-selector').after(
      `<input class="room--confirmation__input" type="button" value="Confirm Room Choice">`
    )
  },

  removeBookingsTool() {
    $('.bookings--tool').empty()
  },

  appendRoomChoices(roomChoices) {
    roomChoices.forEach(booking => { 
      $('.room--confirmation__input').after(
       ` <container class="room-options">
          <p>Room Number: ${booking.number}</p>
          <p>Room Type: ${booking.roomType}</p>
          <p>Bidet: ${booking.bidet ? 'YES' : 'NO'}</p>
          <p>Bed Size: ${booking.bedSize}</p>
          <p>Number of Beds: ${booking.numBeds}</p>
          <p>Price per Night: ${booking.costPerNight}</p>
          <input type="button" value="Select Room">
        </container>`
      )
    })
  }

}
