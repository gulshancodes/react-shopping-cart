import React, { useContext, useEffect } from 'react';
import cartContext from '../context/cartContext';


const Cart = () => {

    const { isCartOpen, cartItems, toggleCart, removeItem, incrementItem, decrementItem } = useContext(cartContext);


    // disable the body-scroll when the Cart is open
    useEffect(() => {
        const docBody = document.body;

        isCartOpen ? (
            docBody.classList.add('overflow_hide')
        ) : (
            docBody.classList.remove('overflow_hide')
        );

    }, [isCartOpen]);


    // closing the Cart on clicking outside of it
    useEffect(() => {
        const outsideClose = (e) => {
            if (e.target.id === 'cart') {
                toggleCart(false);
            }
        };

        window.addEventListener('click', outsideClose);

        return () => {
            window.removeEventListener('click', outsideClose);
        };
    }, [toggleCart]);


    const cartQuantity = cartItems.length;

    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);


    return (
        <>
            {
                isCartOpen && (
                    <div id="cart">
                        <div className="cart_content">
                            <div className="cart_head">
                                <h2>Cart <small>({cartQuantity})</small></h2>
                                <div
                                    title="Close"
                                    className="close_btn"
                                    onClick={() => toggleCart(false)}
                                >
                                    <span>&times;</span>
                                </div>
                            </div>

                            <div className="cart_body">
                                {
                                    cartQuantity === 0 ? (
                                        <h2>Cart is empty</h2>
                                    ) : (
                                        cartItems.map(item => {
                                            const { id, img, title, price, quantity } = item;
                                            const itemTotal = price * quantity;

                                            return (
                                                <div className="cart_items" key={id}>
                                                    <figure className="cart_items_img">
                                                        <img src={img} alt="product-img" />
                                                    </figure>

                                                    <div className="cart_items_info">
                                                        <h4>{title}</h4>
                                                        <h3 className="price">₹ {itemTotal.toLocaleString()}</h3>
                                                    </div>

                                                    <div className="cart_items_quantity">
                                                        <span onClick={() => decrementItem(id)}>&#8722;</span>
                                                        <b>{quantity}</b>
                                                        <span onClick={() => incrementItem(id)}>&#43;</span>
                                                    </div>

                                                    <div
                                                        title="Remove Item"
                                                        className="cart_items_delete"
                                                        onClick={() => removeItem(id)}
                                                    >
                                                        <span>&times;</span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                            </div>

                            <div className="cart_foot">
                                <h3>
                                    <small>Total:</small>
                                    <b>₹ {cartTotal.toLocaleString()}</b>
                                </h3>

                                <button
                                    type="button"
                                    className="checkout_btn"
                                    disabled={cartQuantity === 0}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Cart;