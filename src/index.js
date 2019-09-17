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
  domUpdates.appendTotalRevenue(getTotalRevenue(dateTodayMils, hotel.rooms));
  domUpdates.appendAllRoomService(hotel.roomService.getRoomService(dateTodayMils));
  domUpdates.appendPopularBookingDates(hotel.bookings.getMostBookedDay())
}

$('.tabs-nav a').on('click', function (event) {
  event.preventDefault();
  $('.tabs-nav div').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.tabs-stage div').hide();
  $($(this).attr('href')).show();
});

$('.customer--search--results').on('click', (event) => {
  const dateTodayMils = dateTodayMiliseconds()
  hotel.currentCustomer = hotel.customers.find( customer => customer.id  === parseInt(event.target.dataset.id))
  domUpdates.removeBookingsTool();
  domUpdates.removeAvailableRooms();
  updateDomWithCurrentCustomer()
  domUpdates.appendCustomerBookingsToDOM(hotel.bookings.allBookingsOfCustomer(hotel.currentCustomer))
  domUpdates.removeCustomerNewBookingInput()
  hotel.bookings.newBookingOption(hotel.currentCustomer, dateTodayMils) 
  $('.customer--result').remove();
  $('.customer--search__input').val('')
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
    domUpdates.appendCurrentCusomterNameToDom(hotel.currentCustomer);
    domUpdates.createBookingOption(dateTodayMils)
    domUpdates.removeNewCustomerInput();
    domUpdates.activateAddNewCustomerButton();
  }
})

$('.bookings--tool').on('click', (event) => {
  if (event.target.className === 'create--customer--booking__input') {
    domUpdates.createBookingTool(hotel.bookings.createRoomOptions((hotel.bookings.findRoomTypesForToday(hotel.rooms, dateTodayMils))))
    domUpdates.createBookingSelectButton();
  }
  if (event.target.className === 'room--confirmation__input') {
    const roomRequestType = $('#select--room--type').val()
    domUpdates.removeAvailableRooms();
    domUpdates.appendRoomChoices(hotel.bookings.getAvailableRooms(hotel.rooms, dateTodayMiliseconds(), $('#select--room--type').val()));
  }
})

$('.room--options').on('click', () => {
  hotel.bookings.newBooking(event.target.parentElement.id, hotel.rooms, dateTodayMils, hotel.currentCustomer)
  // have to clear out bookings tool and room options
  domUpdates.removeBookingsTool();
  domUpdates.removeAvailableRooms();
  //need to rerun checking for orders and appendning that to the DOM
  domUpdates.appendCustomerBookingsToDOM(hotel.bookings.allBookingsOfCustomer(hotel.currentCustomer))
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
  return hotel.bookings.getRevenueFromBookedRooms(date, hotelRooms) + hotel.roomService.getRevenueFromRoomservice(date)
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