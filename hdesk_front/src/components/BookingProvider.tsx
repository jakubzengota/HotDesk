import React, { createContext, useEffect, useState } from "react";
import request from '../helper/Request'
import { BASE_URL } from "../helper/Request";
import { MockDesks } from "./deskAPI";
import { IUser, MockUser } from "./userAPI";
import { MockBookings } from "./bookingAPI";
import axios from "axios";
import { GlobalUser } from "./App";

export interface IBookingContextValue {
    bookings: any[],
    setBookings: React.Dispatch<React.SetStateAction<any[]>>,
    user: IUser,
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>,
    desks: any[],
    setDesks: React.Dispatch<React.SetStateAction<any[]>>,
    users: IUser[],
}

export const BookingContext = createContext<IBookingContextValue>(null!);

const BookingProvider: React.FC<{}> = ({ children }) => {

    const [bookings, setBookings] = useState<any[]>([]);
    const [desks, setDesks] = useState<any[]>([]);
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [users, setUsers] = useState<IUser[]>([]);


    const fetchData = async () => {
        // const user = await MockUser();
        //const bookings = await MockBookings();
        // const desks = await MockDesks();
        // const bookings = await request.get(BASE_URL + '/allBookings.json');

        // const bookings =
        //     axios.get("/abreg/app/hd/allBookings.json").then(res => {
        //         console.log('booking from app', res.data);

        //     });



        const headers = new Headers();
        headers.append("dev-execute-as-user", GlobalUser);

        const user = await (await fetch(BASE_URL + '/user.json', { headers })).json();

        if (userGuard(user)) {
            setUser(user);
        }
        const users = await (await fetch(BASE_URL + '/allUsers.json', { headers })).json();
        setUsers(users ?? []);

        const desks = await (await fetch(BASE_URL + '/allDesks.json', { headers })).json();
        setDesks(desks ?? []);

        const bookings = await (await fetch(BASE_URL + '/allBookings.json', { headers })).json();
        setBookings(bookings ?? []);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ContextSetter
            bookings={bookings} setBookings={setBookings}
            user={user} setUser={setUser}
            users={users}
            desks={desks} setDesks={setDesks}
        >
            {children}
        </ContextSetter>
    );

};
export default BookingProvider;

const ContextSetter: React.FC<Partial<IBookingContextValue>> = (props) => {
    const { user, setUser, users, bookings, setBookings, desks, setDesks, children } = props;

    return user && users && bookings && desks && setBookings && setDesks && setUser
        ? <BookingContext.Provider value={{ user, setUser, users, bookings, setBookings, desks, setDesks }}>
            {children}
        </BookingContext.Provider>
        : <div>Trwa wczytywanie</div>
}

function userGuard(x: any): x is IUser {
    return x && typeof x.id === 'number';
}