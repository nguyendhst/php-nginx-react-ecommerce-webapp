import React from 'react';
import './index.css';

function Footer() {
    return (
      
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3>Company</h3>
                        <ul className="list-unstyled three_cols">
                            <li>
                                <a href="#">About us</a>
                            </li>
                            <li>
                                <a href="#">Contact us</a>
                            </li>
                            <li>
                                <a href="#">Terms and conditions</a>
                            </li>
                            <li>
                                <a href="#">FAQ</a>
                            </li>

                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h3>Help</h3>
                        <ul className="list-unstyled three_cols">
                            <li>
                                <a href="#">Shipping</a>
                            </li>
                            <li>
                                <a href="#">Returns</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
   );
 }
 export default Footer;