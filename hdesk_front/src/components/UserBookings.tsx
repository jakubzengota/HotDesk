import React, { useContext, useState } from 'react';
import { BsArrowRepeat, BsTrash, } from 'react-icons/bs';
import Request, { BASE_URL } from '../helper/Request';
import { GlobalUser } from './App';


import { BookingContext } from "./BookingProvider";


export interface IUserBookingsProps {
    options: { id: string, deleted: boolean, status: boolean }[],
}

function UserBookings(): JSX.Element {


    const { bookings, user, setBookings } = useContext(BookingContext);

    const [isPosting, setIsPostnig] = useState(false);

    const userBookings = bookings
        .filter(item => item.bookingUserName === user.operatorName);


    userBookings.sort((a, b) => {
        if (b.bookingDate > a.bookingDate) {
            return 1
        }
        if (b.bookingDate < a.bookingDate) {
            return -1
        }
        return 0
    })

    const toogleDeleteHandler = async (id: any, _deleted: boolean, _status: boolean | null) => {

        const body = {
            id,
            deleted: _deleted,
            status: _status,
        };

        console.log('body', body);
        try {
            setIsPostnig(true);

            const headers = new Headers();
            headers.append("dev-execute-as-user", GlobalUser);

            const requestOptions = {
                method: 'PUT',
                // headers: { 'Content-Type': 'application/json' },
                // headers: headers,

                headers: {
                    "dev-execute-as-user": GlobalUser,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            };
            console.log(requestOptions, requestOptions)
            const response = await fetch(BASE_URL + '/deleteBooking.json', requestOptions);

            const newBookings = [...bookings];
            const itemIdx = newBookings.findIndex(item => item.id === id);
            if (itemIdx) {
                newBookings[itemIdx] = { ...newBookings[itemIdx] };
                newBookings[itemIdx].deleted = _deleted;
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
                        <th scope="col" >Id</th>
                        <th scope="col" >Data rezerwacji</th>
                        <th scope="col" >Użytkownik rezerwacji</th>
                        <th scope="col" >Pomieszczenie</th>
                        <th scope="col" >Numer biurka</th>
                        <th scope="col" >Status</th>
                        <th scope="col" >Opcje</th>
                    </tr>
                </thead>
                <tbody>
                    {userBookings.map((item, idx) => (
                        <tr>
                            <th scope="row">{item.id}</th>
                            <td>{item.bookingDate}</td>
                            <td>{item.guestName == '' ? item.userName : item.guestName}</td>
                            <td>{item.office}</td>
                            <td>{item.deskNumber}</td>

                            <td>{item.status == null ? <p>Oczekująca</p>
                                : (item.status == true ? <p>Zaakceptowana</p> :
                                    (item.status == false && item.deleted == true ? <p>Usunięta</p> : <p>Odrzucona</p>))}</td>

                            <td> <button className='btn btn-warning ng-scope' style={{ width: "120px" }}
                                onClick={() => toogleDeleteHandler(item.id, true, false)}> <BsTrash style={{ verticalAlign: "baseline" }} /> Usuń</button></td>


                            {/* // <td> {item.deleted == false ? <button className='btn btn-warning ng-scope' style={{ width: "120px" }}
                            // onClick={() => toogleDeleteHandler(item.id, true, false)}> <BsTrash style={{ verticalAlign: "baseline" }} /> Usuń</button>
                            //     : <button className='btn btn-primary' style={{ width: "120px" }} onClick={() => toogleDeleteHandler(item.id, false, null)}>
                            //     <BsArrowRepeat style={{ verticalAlign: "baseline" }} /> Przywróć</button>}</td>   */}
                        </tr>
                    ))}
                </tbody>

            </table>

        </>
    );
}


export default UserBookings;