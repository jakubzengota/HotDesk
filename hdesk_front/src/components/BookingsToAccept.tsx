import React, { useState } from "react";
import { useContext } from 'react';
import Request, { BASE_URL } from '../helper/Request';
import { GlobalUser } from "./App";

import { BookingContext } from "./BookingProvider";

export interface IUserBookingsProps {
    options: { id: string, deleted: boolean, status: boolean, acceptOperatorName: string }[],
}

function BookingsToAccept(): JSX.Element {

    const { bookings, user, setBookings, setUser } = useContext(BookingContext);

    const [isPosting, setIsPostnig] = useState(false);

    const bookingsWithAcceptOffice = bookings
        .filter(item => user.acceptOffice.room === item.office)
        .filter(item => !item.deleted);


    bookingsWithAcceptOffice.sort((a, b) => {

        if (b.bookingDate > a.bookingDate) {
            return 1
        }
        if (b.bookingDate < a.bookingDate) {
            return -1
        }
        return 0
    })

    const toogleAcceptHandler = async (id: any, _status: boolean) => {

        const body = {
            id,
            status: _status,

        };

        console.log('body', body);
        try {
            setIsPostnig(true);

            const headers = new Headers();
            headers.append("dev-execute-as-user", GlobalUser);

            const requestOptions = {
                method: 'PUT',
                headers: {
                    "dev-execute-as-user": GlobalUser,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            };
            console.log(requestOptions, requestOptions)
            const response = await fetch(BASE_URL + '/acceptBooking.json', requestOptions);
            const newBookings = [...bookings];
            const itemIdx = newBookings.findIndex(item => item.id === id);
            if (itemIdx) {
                newBookings[itemIdx] = { ...newBookings[itemIdx] };
                newBookings[itemIdx].status = _status;
            }

            setBookings(newBookings);


        } finally { setIsPostnig(false) };
    }



    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Data rezerwacji</th>
                        <th scope="col">Właściciel rezerwacji</th>
                        <th scope="col">Użytkownik rezerwacji</th>
                        <th scope="col">Pomieszczenie</th>
                        <th scope="col">Numer biurka</th>
                        <th scope="col">Akceptacja</th>
                    </tr>
                </thead>


                <tbody>
                    {bookingsWithAcceptOffice.map((item, idx) => (
                        <tr>
                            <th scope="row">{item.id}</th>
                            <td>{item.bookingDate}</td>
                            <td>{item.bookingUserName}</td>
                            <td>{item.guestName == '' ? item.userName : item.guestName}</td>
                            <td>{item.office}</td>
                            <td>{item.deskNumber}</td>
                            {/* <td>{item.bookingStatus == true ? <p>Oczekująca</p> : (item.bookingStatus == true ? <p>Zaakceptowana</p> : <p>Odrzucona</p>)}</td> */}
                            {/* <td>
                                <button className='btn btn-primary' style={{ width: "100px" }}
                                    onClick={() => toogleAcceptHandler(item.id, !item.bookingStatus)}>{item.bookingStatus ? 'Odrzuć' : 'Zaakceptuj'}</button>
                            </td> */}

                            <td> {item.status == false || item.status == null ? <button className='btn btn-primary' style={{ width: "100px" }}
                                onClick={() => toogleAcceptHandler(item.id, true)}>Zaakceptuj</button>
                                : <button className='btn btn-warning ng-scope' style={{ width: "100px" }}
                                    onClick={() => toogleAcceptHandler(item.id, false)}>Odrzuć</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
}

export default BookingsToAccept;