// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/customer.svg'
import './images/orders.svg'
import './images/room.svg'
import './images/dashboard.svg'
import './images/Luna-StayMore.png'
import RoomService from './roomService';
import Hotel from './Hotel';
import Bookings from './Booking';

const customersDataFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users").then(response => response.json());
const bookingsDataFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings").then(response => response.json());
const roomsDataFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms").then(response => response.json());
const roomServiceDataFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomService").then(response => response.json());

// const todaysDate = dateToday()

let allHotelData = { customers: [], bookings: [], rooms: [], roomService: [] }

Promise.all([customersDataFetch, bookingsDataFetch, roomsDataFetch, roomServiceDataFetch])
  .then( data => {
    allHotelData.customers = data[0].users;
    allHotelData.bookings = data[1].bookings;
    allHotelData.rooms = data[2].rooms;
    allHotelData.roomService = data[3].roomService;
    return allHotelData;
  })
  .then(allHotelData => console.log(allHotelData))
  .then(allHotelData => new Hotel(allHotelData))
  .then(allHotelData => new RoomService(allHotelData.roomService))
  .then(allHotelData => new Bookings(allHotelData.bookings))

  const dateToday = () => {
    const newDateFormat = new Date(Date.now())
    return newDateFormat.getTime(allHotelData.roomService);
  }



// Show the first tab by default
$('.tabs-stage div').hide();
$('.tabs-stage div:first').show();
$('.tabs-nav div:first').addClass('tab-active');

// Change tab class and display content
$('.tabs-nav a').on('click', function (event) {
  event.preventDefault();
  $('.tabs-nav div').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.tabs-stage div').hide();
  $($(this).attr('href')).show();
});

console.log('This is the JavaScript entry file - your code begins here.');
