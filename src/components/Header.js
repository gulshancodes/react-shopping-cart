import React, { useContext } from 'react';
import cartContext from '../context/cartContext';


const Header = () => {

    const { cartItems, toggleCart } = useContext(cartContext);

    const cartQuantity = cartItems.length;

    return (
        <>
            <header id="header">
                <div className="container">
                    <div className="navbar">
                        <h4>React Shopping Cart</h4>
                        <div className="nav_menu">
                            <div
                                title="Cart"
                                className="cart_icon"
                                onClick={() => toggleCart(true)}
                            >
                                <img src="/images/bag-icon.svg" alt="bag-icon" />
                                {
                                    cartQuantity >= 1 && (
                                        <span className="badge">{cartQuantity}</span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;