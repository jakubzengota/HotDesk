import React, { useState, useContext, Component, useEffect } from "react";
import { BsCalendarPlus, BsFillPersonFill, BsCalendarCheck, BsCalendar3 } from 'react-icons/bs';

import BookingProvider from "./BookingProvider";
import { BookingContext } from "./BookingProvider";

import '../styles/App.css'
import NavLinks from "./NavLinks";
import Add from "../OLD/Add";
import User from "./User";
import AddBookingForm from "./AddBookingForm";
import AllBookingsReview from "./AllBookingsReview";
import BookingsToAccept from "./BookingsToAccept";
import UserBookings from "./UserBookings";
import { BrowserRouter as Router, NavLink, Switch, Route } from "react-router-dom";
import axios from "axios";

export const GlobalUser = "jzengota"

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // const { user } = useContext(BookingContext);
    // const [canAccept, setCanAccept] = useState(false);
    
    // const canUserAccept = Boolean(user.acceptOffice.lenght > 0);
    

    // useEffect(() => {
    //     axios.get("/abreg/app/hd/allDesks.json").then(res => {
    //         console.log('desk from app', res.data);
    //     });
    //
    // }, []);

    useEffect(() => {
        const headers = new Headers();
        headers.append("dev-execute-as-user", "");
        fetch("/abreg/app/hd/allBookings.json", { headers })
            .then(console.log)
            .catch(console.error);
        // axios.get("/abreg/app/hd/allBookings.json").then(res => {
        //     console.log('booking from app', res.data);
        // });

    }, []);

    const handleOnClose = () => {
        setIsModalOpen(false);
    }
    const handleOnClick = () => {
        setIsModalOpen(true);
    }

    return (
        <BookingProvider>
            <Router>


                <User />
                <div style={{ display: 'flex' }}>

                    <div className='p-2'>
                        <button className='btn btn-warning ng-scope' onClick={handleOnClick} > <BsCalendarPlus style={{ verticalAlign: "baseline" }} /> Dodaj rezerwację </button>
                    </div>
                    <NavLinks />
                </div>
                <AddBookingForm handleOnClose={handleOnClose} isModalOpen={isModalOpen} />
                

                <body>
                    <section>
                        <Switch>

                            <Route path="/" exact component={() => <AllBookingsReview />} />
                            <Route path="/mybookings" exact component={() => <UserBookings />} />
                            <Route path="/acceptbookings" exact component={() => <BookingsToAccept />} />
                        </Switch>
                    </section>
                </body>
            </Router>
        </BookingProvider>
    );
};
export default App;