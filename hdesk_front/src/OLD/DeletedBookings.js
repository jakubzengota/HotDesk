// import React from "react";
// import Booking from "./Booking";
//
// const DeletedBookings = (props) => {
//
//     const deleted = props.bookings
//         .filter(booking => booking.deleted);
//
//     deleted.sort((a, b) => {
//         if (b.bookingDate > a.bookingDate) {
//             return 1
//         }
//         if (b.bookingDate < a.bookingDate) {
//             return - 1
//         }
//         return 0
//     })
//
//     const deletedBookings = deleted.map(booking => <Booking key={booking.id} deleted={booking.deleted}
//         booking={booking} accept={props.accept} refuse={props.refuse} delete={props.delete} />);
//
//     //TODO przycisk przywroc i anuluj akceptacje
//
//     return (
//         <>
//             {deletedBookings.length > 0 ? deletedBookings : <p>Brak usuniętych rezerwacji</p>}
//         </>
//
//     );
// }
//
// export default DeletedBookings;