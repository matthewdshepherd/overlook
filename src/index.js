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

const customersDataFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users").then(response => response.json());
const bookingsDataFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings").then(response => response.json());
const roomsDataFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms").then(response => response.json());
const roomServiceDataFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices").then(response => response.json());

let allData = { users: [], bookings: [], rooms: [], roomService: [] }

Promise.all([customersDataFetch, bookingsDataFetch, roomsDataFetch, roomServiceDataFetch])
  .then( data => {
    allData.users = data[0].users;
    allData.bookings = data[1].bookings;
    allData.rooms = data[2].rooms;
    allData.roomService = data[3].roomServices;
    return allData;
  })
  .then(allData => console.log(allData))

console.log('This is the JavaScript entry file - your code begins here.');
