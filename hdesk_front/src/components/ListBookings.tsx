import React, { useContext } from "react";

import { BookingContext } from "./BookingProvider";

export interface IListBookingsProps {

}

const ListBookings = (props: IListBookingsProps) => {
    const { bookings, setBookings } = useContext(BookingContext);

    const accepted = bookings
        .filter(booking => booking.bookingStatus)
        .filter(booking => booking.bookingDate > new Date().toISOString().slice(0, 10));

    accepted.sort((a, b) => {
        if (b.bookingDate > a.bookingDate) {
            return 1
        }
        if (b.bookingDate < a.bookingDate) {
            return -1
        }
        return 0
    })

    // const acceptedBookings = accepted
    //     .map(booking => <Booking key={booking.id}
    //         deleted={booking.deleted}
    //         booking={booking}
    //         accept={booking.accept}
    //         refuse={booking.refuse}
    //         delete={booking.delete} />);

    const widthMin = {
        width: '15%'
    }
    const widthMax = {
        width: '40%'
    }
    return (
        <>
            <div className="bookingList">

                <table className='bookingTable'>

                    <tr className="firstRow">
                        <td style={widthMin}>Data rezerwacji</td>
                        <td style={widthMax}>Właściciel rezerwacji</td>
                        <td style={widthMin}>Pomieszczenie</td>
                        <td style={widthMin}>Numer biurka</td>
                        <td style={widthMin}>Status</td>
                        <td style={widthMin}>Opcje</td>
                    </tr>
                </table>
                {/* {acceptedBookings.length > 0 ? acceptedBookings : <p>Brak zaakceptowanych rezerwacji</p>} */}
            </div>
            <hr />
        </>


    );
}
export default ListBookings;