import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { BookingContext } from "./BookingProvider";
import Select from "./Select";
import IMAGES from '../img/index'
import Request, { BASE_URL } from '../helper/Request';
import utils from "./utils";
import { IUser } from "./userAPI";
import { Checkbox } from "semantic-ui-react";
import { GlobalUser } from "./App";


export interface IAddBookingFormProps {
    handleOnClose: any,
    isModalOpen: boolean
}

const AddBookingForm = ({ handleOnClose, isModalOpen }: IAddBookingFormProps) => {

    const { bookings, user, users, desks, setBookings } = useContext(BookingContext);

    const [userId, setUserId] = useState<number>(-1);
    const [guest, setGuest] = useState(false);
    const [guestName, setGuestName] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [office, setOffice] = useState('');
    const [deskNumber, setDeskNumber] = useState('');
    const [isPosting, setIsPostnig] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>[]>([]);


    const imgKey = Object.keys(IMAGES).filter(key => key === office)[0];
    const img = IMAGES[imgKey];


    const selectedUser = users
        .filter((v, i, a) => v.operatorID === userId)[0] as IUser | undefined;

    const userPermissionOfficeList = user.permissionsOfficeList.split(",").map(item => item.trim());


    const officess = userPermissionOfficeList
        .map(item => item)
        .filter((v, i, a) => a.indexOf(v) === i)
        .map(item => ({ id: item, label: item }));

    const desksFromOffice = desks
        .filter((v, i, a) => v.office === office)
        .map(item => item.desk)
        .filter((v, i, a) => a.indexOf(v) === i)
        .map(item => ({ id: item, label: item }));

    const usersOptions = users
        .map(item => ({ id: item.operatorID, label: item.operatorName }));

    const [validateMessage, setValidateMessage] = useState('Dodano rezerwację');

    const validateMessageComponent = validateMessage.length ? <p>{validateMessage}</p> : null;

    const handleUserName: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
        setUserId(Number.parseInt(event.target.value));
    }
    const handleGuestName: ChangeEventHandler<HTMLInputElement> = (event) => setGuestName(event.target.value);

    const handleCheckbox: MouseEventHandler<HTMLInputElement> = (event) => setGuest((event.target as any).value);
    const handleDate: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => setBookingDate(event.target.value);
    const handleOffice: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => setOffice(event.target.value);
    const handleDesk: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => setDeskNumber(event.target.value);
    const handleOnCloseModal: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        handleOnClose();
    }

    // const listID = bookings
    //     .map(item => item.id)
    // const lastID = listID[listID.length - 1]
    // const newID = (parseInt(lastID) + 1).toString();

    useEffect(() => {
        if (user) {
            setUserId(user.operatorID);
        }
    }, [user?.id]);

    useEffect(() => {
        const filterBookings = bookings
            .filter((v, i, a) => v.bookingDate === bookingDate)
            .filter((v, i, a) => v.deskNumber === deskNumber);

        if (filterBookings.length > 0) {
            setErrors(errors => ({ ...errors, "To biurko jest już zarezerwowane": 'Wybierz inną datę lub inne biurko.' }));
        }
        else {
            setErrors(errors => ({ ...errors, "To biurko jest już zarezerwowane": undefined }));
        }
    }, [bookingDate, deskNumber]);

    useEffect(() => {
        const filterBookings = bookings
            .filter((v, i, a) => v.bookingDate === bookingDate)
            .filter((v, i, a) => v.bookingUserName === user.operatorName);

        if (filterBookings.length > 0) {
            setErrors(errors => ({ ...errors, "biurko zarezerwowane": 'Posiadasz rezerwację dla wybranej daty.' }));
        }
        else {
            setErrors(errors => ({ ...errors, "biurko zarezerwowane": undefined }));
        }
    }, [bookingDate, deskNumber]);


    const handleOnSubmit: MouseEventHandler<HTMLButtonElement> = async event => {
        event.preventDefault();
        const body = {
            // id: newID,
            id: '',
            bookingDate: bookingDate,
            bookingUserName: user.operatorName,
            userId: userId,
            guest: guest,
            guestName: guestName,
            office: office,
            deskNumber: deskNumber,
            status: autoBookingStatus(),
            statusSetDate: '',
            acceptOperatorName: '',
            deleted: false,
        };
        console.log('body', body);
        try {
            setIsPostnig(true);
            // await utils.wait(1000);

            const headers = new Headers();
            headers.append("dev-execute-as-user", GlobalUser);

            const requestOptions = {
                method: 'POST',
                // headers: { 'Content-Type': 'application/json' },
                // headers: headers,
            
            
                headers: {
                    "dev-execute-as-user": "jzengota",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                //body: JSON.stringify({ title: 'React POST Request Example' })
                body: JSON.stringify(body)
            };
            console.log(requestOptions, requestOptions)
            const response = await fetch(BASE_URL + '/addBooking.json', requestOptions);
            const booking = await response.json();
            setBookings(bookings => [...bookings, booking]);

        } finally {
            setIsPostnig(false)
        };

        // setBookings(event.target.value)
        // resetStateOfInputs();
        handleOnClose();
    };


    const autoBookingStatus = function () {
        if (user.defaultOffice.room === office && user.defaultDesk.desk === deskNumber) {
            // return true
            return null
        }
        else {
            return null
        }
    }

    const sinceTooday = function () {

        let today = new Date();
        today.setDate(today.getDate());

        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        const result = yyyy
            + '-'
            + `${mm}`.padStart(2, "0")
            + '-'
            + `${dd}`.padStart(2, "0");

        return result;
    }

    const resetStateOfInputs = () => {
        setUserId(user.operatorID);
        setGuest(false);
        setGuestName('');
        setBookingDate('');
        setOffice(user.defaultOffice.room);
        setDeskNumber(user.defaultDesk.desk);
        setValidateMessage('');
    }
    useEffect(() => {
        if (isModalOpen) {
            resetStateOfInputs();
        }
    }, [isModalOpen]);
    const errorsList = Object.values(errors).filter(text => text);


    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeCloseOnOutsideClick={true}>
            {validateMessageComponent}
            {/*<form method="post" onSubmit={true}>*/}
            <div /*onSubmit={true}*/>
                <div className='modal-body' style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Dodaj rezerwację
                </div>
                <div className='modal-body'>

                <div className='col-md-12'>
                        <div>
                            <label className='col-md-4' htmlFor="office">Wybierz pomieszczenie </label>
                            <Select className='col-md-2' value={office} id="office" onChange={handleOffice} options={officess} />
                            <label className='col-md-0' htmlFor="desk">  </label>
                            
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div>
                            <label className='col-md-4' htmlFor="desk">Wybierz biurko </label>
                            <Select className='col-md-2' value={deskNumber} id="desk" onChange={handleDesk} options={desksFromOffice} />
                            <label className='col-md-0' htmlFor="desk">  </label>
                            
                           
                        </div>
                    </div>

                    <div className='col-md-12'>
                        <label className='col-md-4' htmlFor="user">Wybierz użytkownika </label>
                        <Select className='col-md-5' value={selectedUser?.operatorID} id="user" onChange={handleUserName} options={usersOptions} />
                        <label className='col-md-3' htmlFor="desk">  </label>
                        {/* <input className='col-md-1' type="checkbox" id="user" checked = {guest} onClick={handleCheckbox} /> */}
                    </div>
                    <div className='col-md-12'>
                        <label className='col-md-4' htmlFor="user"> lub wpisz imię i nazwisko gościa</label>
                        <label className='col-md-0' htmlFor="desk">  </label>
                        <input className='col-md-5' type="text" id="guest" onChange={handleGuestName}></input>

                    </div>
                    <br />
                    <div>
                        <label className='col-md-5' htmlFor="date">  </label>
                    </div>
                    <div className='col-md-12'>
                        <label className='col-md-4' htmlFor="date">Podaj datę </label>
                        <input className='col-md-5' type="date" min={sinceTooday()} required value={bookingDate} onChange={handleDate} />
                    </div>
                    <br />


                    <br />

                    <p>
                        {img && <img src={img} alt="rzut" style={{ width: "500px" }} />}

                    </p>
                </div>
                <div>{errorsList.map(error => <div className="alert alert-danger" role="alert">{error}</div>)}</div>
                <div className='modal-footer ng-scope'>
                    <button type="submit" className='btn btn-primary' disabled={isPosting || errorsList.length !== 0} onClick={handleOnSubmit}>Zapisz</button>
                    <button type="button" className='btn btn-warning' disabled={isPosting} onClick={handleOnCloseModal}>Anuluj</button>
                </div>
            </div>
        </Modal>
    );
};

export default AddBookingForm;