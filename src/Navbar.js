import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Login/Register</Link>
          </li>
          <li>
            <Link to="/availability">Organ Availability</Link>
          </li>
          <li>
            <Link to="/request">Organ Request</Link>
          </li>
        </ul>
      </nav>
    );
  }

  export default Navbar;