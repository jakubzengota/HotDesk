import React, { useContext } from 'react';

import { BookingContext } from "./BookingProvider";

function AllBookingsReview(): JSX.Element {

    const { bookings } = useContext(BookingContext);

    const accepted = bookings.filter(item => item.status);

    accepted.sort((a, b) => {

        if (b.bookingDate > a.bookingDate) {
            return 1
        }
        if (b.bookingDate < a.bookingDate) {
            return -1
        }
        return 0
    })

    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Data rezerwacji</th>
                        <th scope="col">Użytkownik rezerwacji</th>
                        <th scope="col" >Pomieszczenie</th>
                        <th scope="col" >Numer biurka</th>

                    </tr>
                </thead>
                <tbody>
                    {accepted.map((item) => (
                        <tr>
                            <th scope="row">{item.id}</th>
                            <td>{item.bookingDate}</td>
                            <td>{item.guestName == '' ? item.userName : item.guestName}</td>
                            <td>{item.office}</td>
                            <td>{item.deskNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
}

export default AllBookingsReview;