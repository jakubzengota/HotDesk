// import React from 'react';
// import '../styles/BookingTable.css';
//
//
// const Booking = (props) => {
//
//     const widthMin = {
//         width: '15%'
//     }
//     const widthMax = {
//         width: '40%'
//     }
//
//     const { bookingDate, bookingOwner, office, desk, id, bookingStatus, deleted } = props.booking;
//
//
//     if (bookingStatus === null && !deleted) {
//         return (
//             <div>
//                 <hr />
//                 <table className='bookingTable'>
//                     <thead>
//                         <tr>
//                             <td style={widthMin}>{bookingDate}</td>
//                             <td style={widthMax}>{userName}</td>
//                             <td style={widthMin}>{office}</td>
//                             <td style={widthMin}>{desk}</td>
//                             <td >
//                                 <div style={{ display: "flex" }}>
//                                     <button className="acceptButton" onClick={() => props.accept(id)}>Zaakceptuj</button>
//                                     <button className="refuseButton" onClick={() => props.refuse(id)}>Odrzuć</button>
//                                 </div><br />
//                                 <button className="deleteButton" onClick={() => props.delete(id)}>Usuń</button>
//
//                             </td>
//                         </tr>
//                     </thead>
//                 </table>
//             </div>
//         );
//         //TODO tylko aktualne zrobic
//     } else if (bookingStatus && !deleted) {
//         return (
//             <div>
//                 <table className='bookingTable'>
//                     <thead>
//                         <tr>
//                             <td style={widthMin}>{bookingDate}</td>
//                             <td style={widthMax}>{bookingOwner}</td>
//                             <td style={widthMin}>{office}</td>
//                             <td style={widthMin}>{desk}</td>
//                             <td>
//                                 <button className="deleteButton" onClick={() => props.delete(id)}>Usuń</button>
//                             </td>
//                         </tr>
//                     </thead>
//                 </table>
//             </div>
//         );
//     } else {
//         return (
//             <div></div>
//         )
//     }
// }
//
// export default Booking;
//
