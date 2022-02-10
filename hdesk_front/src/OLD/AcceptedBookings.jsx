// import React, { useContext } from 'react';

// import { BookingContext } from "./BookingProvider";

// function AcceptedBookings() {

//     const booking = useContext(BookingContext);

//     console.log(booking.bookings.length);

//     const accepted = booking.bookings.filter(item => item.bookingStatus);
//     console.log(accepted);

//     accepted.sort((a, b) => {

//         if (b.bookingDate > a.bookingDate) {
//             return 1
//         }
//         if (b.bookingDate < a.bookingDate) {
//             return -1
//         }
//         return 0
//     })

//     return (
//         <tbody>
//             {accepted.map(item => (
//                 <tr>
//                     <th scope="row">{item.id}</th>
//                     <td>{item.bookingDate}</td>
//                     <td>{item.bookingOwner}</td>
//                     <td>{item.office}</td>
//                     <td>{item.desk}</td>
//                     <td>Zaakceptowane</td>
//                     {/* {item.bookingStatus === null ? <p>Oczekująca</p> : item.bookingStatus === null ? <p>zaakceptowana</p> : <p>Odrzucona</p>}
//                     <td>if user delete, if acceptor zaakceptuj</td> */}
//                 </tr>
//             ))}
//         </tbody>
//     );
// }

// export default AcceptedBookings;