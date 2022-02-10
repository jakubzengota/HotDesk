// import React, {useState} from "react";
// import '../styles/AddBooking.css';
// import user from './User.js';
// import {NavLink} from 'react-router-dom';

// function AddBooking () {

//     const [ bookingOwner, setBookingOwner ] = React.useState('');
//     const [ office, setOffice ] = React.useState('');
//     const [ desk, setDesk ] = React.useState('');
//     const [ guest, setGuest ] = React.useState(false);
//     const [ bookingDate, setBookingDate ] = React.useState('');


//     const handleDate = (e) => {
//        setBookingDate(e.target.value);
//         }

//     const handleBookingOwner = (e) => {
//         setBookingOwner({
//             bookingOwner: e.target.value
//         })
//     }
//     const handleOffice = (e) => {
//         office.setState({
//             office: e.target.value
//         })
//     }
//     const handleDesk = (e) => {
//         desk.setState({
//             desk: e.target.value
//         })
//     }
//     const  handleCheckbox = (e) => {
//         guest.setState({
//             guest: e.target.value
//         })
//     }
//     const  handleClick = () => {
//         const {bookingDate, bookingOwner, guest, office, desk} = this.state;

//         if (bookingOwner.length > 5 && bookingOwner.indexOf(" ") !== -1 &&
//             bookingOwner.indexOf(" ") !== 0 && bookingOwner.indexOf(" ") !== (bookingOwner.length - 1)) {
//             const add = this.props.add(bookingDate, bookingOwner, guest, office, desk);
//             if (add) {
//                 this.setState({
//                     bookingOwner: '',
//                     office: '',
//                     desk: '',
//                     guest: false,
//                     bookingDate: this.minDate,
//                 })
//                 //return <Redirect to="/" />
//             }
//         } else {
//             alert("Podaj prawidłową nazwę użytkownika");
//             window.location = 'http://localhost:3000/hotdesk/addBooking';
//         }
//     }

//         return (
//             <div className="form">
//                 <label htmlFor="user">Podaj użytkownika </label>
//                 <input type="text" placeholder={'imie'} value={this.state.bookingOwner} id="user"
//                        onChange={this.handleBookingOwner}/>

//                 <input type="checkbox" guest={this.state.guest} id="user" onClick={this.handleCheckbox}/>
//                 <label htmlFor="user">Gość</label>
//                 <br/>
//                 <label htmlFor="date">Podaj datę </label>
//                 <input type="date" onChange={handleDate}/>
//                 <br/>

//                 <label htmlFor="office">Wybierz biuro </label>


//                 {/*Ten select ma pochodzić z User permissonsOfficeList*/}
//                 <select className="select" value={this.state.office} id="office"
//                         onChange={this.handleOffice}>
//                     <option value="">{user.permissonsOfficeLis}</option>

//                 </select>
//                 <br/>
//                 <label htmlFor="desk">Wybierz biurko </label>

//                 <select className="select" value={this.state.desk} id="desk"
//                         onChange={this.handleDesk}>
//                     <option value=""></option>
//                     <option value="Gondor.1">Gondor.1</option>
//                     <option value="Gondor.2">Gondor.2</option>
//                     <option value="Gondor.3">Gondor.3</option>
//                     <option value="Gondor.4">Gondor.4</option>
//                 </select>
//                 <nav>
//                     <NavLink to="/hotdesk/bookingList" classsName="saveButton">
//                         <button onClick={this.handleClick}>Zapisz</button>
//                     </NavLink>
//                     <NavLink to="/" classsName="cancelButton">
//                         <button type="button">Anuluj</button>
//                     </NavLink>
//                 </nav>

//             </div>
//         );
//     }


// export default AddBooking;