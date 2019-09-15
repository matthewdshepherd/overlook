
import $ from 'jquery';
import './css/base.scss';
import './images/customer.svg';
import './images/orders.svg';
import './images/room.svg';
import './images/dashboard.svg';
import './images/Luna-StayMore.png';
import domUpdates from "./domUpdates";
import Hotel from './Hotel';

let hotel;

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
  $('.customer--search__input').on('keydown', (e) => {
    if (e.keyCode == 8) {
      searchFilter()
    }
  })

})

const openHotel = () => {
  const dateTodayMils = dateTodayMiliseconds()
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
  console.log(results.length)
  if (results.length > 80){
    console.log('tyring to delete')
    $('.customer--result').remove();
  }
}


