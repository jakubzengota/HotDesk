import React from "react";
import { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { BsCalendarPlus, BsFillPersonFill, BsCalendarCheck, BsCalendar3 } from 'react-icons/bs';
import { useState } from "react";
import AddBookingForm from "./AddBookingForm";

import { BookingContext } from "./BookingProvider";

function NavLinks() {

    const {user} = useContext(BookingContext);
    
    const canAccept = Boolean(user.acceptOffice !== null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const handleOnClick = () => {
        setIsModalOpen(true);
    }
    const handleOnClose = () => {
        setIsModalOpen(false);
    }
    
    return (
        <div style={{ display: 'flex' }}>
                    <NavLink to="/" >
                        <div className='ml-auto p-2'>
                            <button className='btn btn-error ng-scope' style={{ textDecoration: "none" }}> <BsCalendar3 style={{ verticalAlign: "baseline" }} /> Wszystkie rezerwacje  </button>
                        </div>
                    </NavLink>

                    <NavLink to="/mybookings" >
                        <div className='ml-auto p-2'>
                            <button className='btn btn-primary'  > <BsFillPersonFill style={{ verticalAlign: "baseline" }} /> Moje rezerwacje  </button>
                        </div>
                    </NavLink>
                    
                   {canAccept && (
                    <NavLink to="/acceptbookings">
                        <div className='p-2'>
                            <button className='btn btn-info ng-scope' > <BsCalendarCheck style={{ verticalAlign: "baseline" }} /> Rezerwacje do akceptacji </button>
                        </div>
                    </NavLink>
                    )}

                </div>
                
    );
}
export default NavLinks;