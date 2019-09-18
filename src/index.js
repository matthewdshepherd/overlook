/* eslint-disable max-len */

import $ from 'jquery';
import './css/base.scss';
import './images/customer.svg';
import './images/orders.svg';
import './images/room.svg';
import './images/dashboard.svg';
import './images/Luna-StayMore.png';
import domUpdates from "./domUpdates";
import Hotel from './Hotel';
import { parse } from 'querystring';

let hotel;
let dateTodayMils;

const customersDataFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users").then(response => response.json());
const bookingsDataFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings").then(response => response.json());
const roomsDataFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms").then(response => response.json());
const roomServiceDataFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices").then(response => response.json());

let allHotelData = { customers: [], bookings: [], rooms: [], roomService: [] }

Promise.all([customersDataFetch, bookingsDataFetch, roomsDataFetch, roomServiceDataFetch])
  .then( data => {
    allHotelData.customers = data[0].users;
    allHotelData.bookings = data[1].bookings;
    allHotelData.rooms = data[2].rooms;
    allHotelData.roomService = data[3].roomServices;
    return allHotelData;
  })
  .then(allHotelData => hotel = new Hotel(allHotelData))
  .then(allHotelData => openHotel())

$(document).ready(() => {
  const todaysDate = dateInString();
  domUpdates.appendDateToPage(todaysDate);
  domUpdates.showFirstTabByDefault();
  $('.customer--search__input').on('keypress', searchFilter)
  $('.customer--search__input').on('keydown', (event) => {
    if (event.keyCode === 8) {
      searchFilter()
    } else if (event.keyCode === 13) {
      domUpdates.selectCustomerFromSearchField();
    }
  })
})

const openHotel = () => {
  var dateTodayMils = dateTodayMiliseconds()
  domUpdates.appendAvailableRoomsToDashboard(hotel.bookings.getAmountOfRoomsAvailable(dateTodayMils, hotel.rooms));
  domUpdates.appendPercentageOfBookedRooms(hotel.bookings.getPercentageOfRoomsBooked(dateTodayMils, hotel.rooms));
  domUpdates.appendTotalRevenue(getTotalRevenue(dateTodayMiliseconds(), hotel.rooms));
  domUpdates.appendAllRoomService(hotel.roomService.getRoomService(dateTodayMils));
  domUpdates.appendPopularBookingDates(hotel.bookings.getMostBookedDay())
  hotel.roomService.getRoomServiceMenu()
}

$('.tabs-stage sectiongit ').hide();
$('.tabs-stage section:first').show();
$('.tabs-nav container:first').addClass('tab-active');

$('.tabs-nav a').on('click', function (event) {
  event.preventDefault();
  $('.tabs-nav container').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.tabs-stage div').hide();
  $($(this).attr('href')).show();
});

$('.customer--search--results').on('click', (event) => {
  const dateTodayMils = dateTodayMiliseconds()
  hotel.currentCustomer = hotel.customers.find( customer => customer.id  === parseInt(event.target.dataset.id))
  domUpdates.removeBookingsTool();
  domUpdates.removeAvailableRooms();
  domUpdates.removeCustomerOrders();
  domUpdates.removePlaceHolder();
  domUpdates.removeFoodServiceMenuInput();
  domUpdates.clearOutNameInputFields();
  updateDomWithCurrentCustomer();
  domUpdates.appendCustomerBookingsToDOM(hotel.bookings.allBookingsOfCustomer(hotel.currentCustomer));
  domUpdates.removeCustomerNewBookingInput();
  domUpdates.appendCustomerRoomService(hotel.roomService.getCustomersRoomServiceAllTime(hotel.currentCustomer));
  domUpdates.appendCustomerRoomServiceTotal(hotel.roomService.getTotalSpendOnRoomService(hotel.currentCustomer));
  hotel.bookings.newBookingOption(hotel.currentCustomer, dateTodayMils);
  $('.customer--result').remove();
  $('.customer--search__input').val('');
  if (hotel.bookings.findBookingForToday(hotel.currentCustomer, dateTodayMiliseconds())) {
    domUpdates.createFoodOrderSelector(hotel.roomService.createOrderOptions());
  };
})

$('.customer--create__buttton').on('click', () => {
  domUpdates.buildAddCustomerInputField();
  domUpdates.focusInNewCustomerInputField();
})

$('.customer--create').on('keydown', (event) => {
  if (event.keyCode === 13 && $('.customer--create--input').val() === '') {
    domUpdates.removeNewCustomerInput();
    domUpdates.activateAddNewCustomerButton();
  } else if (event.keyCode === 13) {
    hotel.currentCustomer = {id: hotel.customers.length + 1, name: $('.customer--create--input').val()}
    hotel.customers.push(hotel.currentCustomer);
    domUpdates.removeBookingsTool();
    domUpdates.removeAvailableRooms();
    domUpdates.removeCurrentBookings();
    domUpdates.removeCustomerOrders();
    domUpdates.removePlaceHolder();
    domUpdates.removeFoodServiceMenuInput();
    domUpdates.clearOutNameInputFields();
    domUpdates.appendCurrentCusomterNameToDom(hotel.currentCustomer);
    domUpdates.createBookingOption(dateTodayMils)
    domUpdates.removeNewCustomerInput();
    domUpdates.activateAddNewCustomerButton();
  }
})

$('.bookings--tool').on('click', (event) => {
  if (event.target.className === 'create--customer--booking__input') {
    domUpdates.createBookingTool(hotel.bookings.createRoomOptions((hotel.bookings.findRoomTypesForToday(hotel.rooms, dateTodayMiliseconds()))))
    domUpdates.createBookingSelectButton();
  }
  if (event.target.className === 'room--confirmation__input') {
    domUpdates.removeAvailableRooms();
    domUpdates.appendRoomChoices(hotel.bookings.getAvailableRooms(hotel.rooms, dateTodayMiliseconds(), $('#select--room--type').val()));
  }
})

$('.room--options').on('click', () => {
  hotel.bookings.newBooking(event.target.parentElement.id, hotel.rooms, dateTodayMils, hotel.currentCustomer)
  domUpdates.removeBookingsTool();
  domUpdates.removeAvailableRooms();
  domUpdates.appendCustomerBookingsToDOM(hotel.bookings.allBookingsOfCustomer(hotel.currentCustomer))
  domUpdates.appendAvailableRoomsToDashboard(hotel.bookings.getAmountOfRoomsAvailable(dateTodayMiliseconds(), hotel.rooms));
  domUpdates.appendPercentageOfBookedRooms(hotel.bookings.getPercentageOfRoomsBooked(dateTodayMiliseconds(), hotel.rooms));
  domUpdates.appendTotalRevenue(getTotalRevenue(dateTodayMiliseconds(), hotel.rooms));
  domUpdates.createFoodOrderSelector(hotel.roomService.createOrderOptions());
  if (hotel.bookings.findBookingForToday(hotel.currentCustomer, dateTodayMiliseconds())) {
    console.log('THIS IS DOING SOMETHING')
  };
})

$('.orders--tool').on('click', (event) => {
  if (event.target.className === "order--confirmation__input") {
    hotel.roomService.newRoomServiceOrder($('#select--order--type').val(), hotel.currentCustomer, dateTodayMiliseconds())
    domUpdates.appendTotalRevenue(getTotalRevenue(dateTodayMiliseconds(), hotel.rooms));
    domUpdates.appendAllRoomService(hotel.roomService.getRoomService(dateTodayMils));
    domUpdates.removeCustomerOrders();
    domUpdates.appendCustomerRoomService(hotel.roomService.getCustomersRoomServiceAllTime(hotel.currentCustomer));
    domUpdates.appendCustomerRoomServiceTotal(hotel.roomService.getTotalSpendOnRoomService(hotel.currentCustomer));
  }


})

const updateDomWithCurrentCustomer = () => {
  domUpdates.appendCurrentCusomterNameToDom(hotel.currentCustomer)
}

const dateTodayMiliseconds = () => {
  const date = new Date(Date.now())
  const dateYearMonthDate = `${date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()}`
  const updatedDate = new Date(dateYearMonthDate)
  return updatedDate.getTime();
}

const dateInString = () => {
  return new Date(dateTodayMiliseconds()).toString().split(' ').splice(0, 4).join(' ')
}

const getTotalRevenue = (date, hotelRooms) => {
  return (parseFloat(hotel.bookings.getRevenueFromBookedRooms(date, hotelRooms)) + parseFloat(hotel.roomService.getRevenueFromRoomservice(date)))
}

const searchFilter = (event) => {
  let search = $('.customer--search__input').val().toLowerCase();
  var results = hotel.customers.filter( (customer) => {
    return ( (customer.name.toLowerCase().includes(search)) );
  });
  $('.customer--result').remove();
  results.forEach( (customer)=> {
    domUpdates.appendCustomerSearch(customer);
  });
  if (results.length > 70) {
    $('.customer--result').remove();
  }
}