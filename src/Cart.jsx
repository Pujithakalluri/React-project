import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "./cartSlice";
import { applyCoupon, resetCoupon } from "./couponSlice";
import { placeOrder } from "./orderSlice"; // ✅ Corrected
import { ToastContainer, toast } from "react-toastify";
import QRCode from "react-qr-code";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart || []);
  const { applied, discount } = useSelector((state) => state.coupon);

  const [discountPer, setDiscountPer] = useState(0);
  const [input, setInput] = useState("");
  const [isCheckout, setIsCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  /* ---------------- CALCULATIONS ---------------- */
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const manualDiscount = (totalAmount * discountPer) / 100;
  const couponDiscount = applied ? (totalAmount * discount) / 100 : 0;
  const priceAfterDiscount = totalAmount - manualDiscount - couponDiscount;
  const gst = (priceAfterDiscount * 18) / 100;
  const finalAmount = priceAfterDiscount + gst;

  /* ---------------- PLACE ORDER ---------------- */
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    dispatch(placeOrder(cartItems));
    dispatch(clearCart());
    dispatch(resetCoupon());
    setDiscountPer(0);
    setIsCheckout(false);
    setPaymentMethod("");
    setCustomerEmail("");

    toast.success(`${item.name} added to cart successfully!`, {
      autoClose: 2000,
      pauseOnHover: false,
    });
  };

 

    const templateParams = {
      orders: cartItems.map((item) => ({
        name: item.name,
        units: item.quantity,
        price: (item.price * item.quantity).toFixed(2),
      })),
      total: finalAmount.toFixed(2),
      email: customerEmail,
    };
     /* ---------------- EMAIL FUNCTION ---------------- */
  const handleCheckout = () => {
    if (!customerEmail) {
      toast.error("Please enter your email");
    }

    emailjs
      .send(
        "service_ieaag0g",
        "template_fwdl72a",
        templateParams,
        "VpjNrru2rjZGDRbJU"
      )
      .then(() => toast.success("Email sent successfully!"))
      .catch(() => toast.error("Email sending failed!"));
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="cart-container">
      <ToastContainer position="top-right" autoClose={2000} />

      {cartItems.length === 0 ? (
        <h1>Your cart is empty</h1>
      ) : (
        <>
          <button
            className="clear-btn"
            onClick={() => {
              dispatch(clearCart());
              dispatch(resetCoupon());
              setDiscountPer(0);
            }}
          >
            Clear Cart
          </button>

          {/* CART ITEMS */}
          <ol className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <strong>{item.name}</strong>
                  <p>₹{item.price}</p>
                </div>

                <div className="quantity-control">
                  <button onClick={() => dispatch(decrementQuantity(item.id))}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(incrementQuantity(item.id))}>
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => {
                    dispatch(removeFromCart(item.id));
                    toast.error(`${item.name} removed`);
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ol>

          {/* SUMMARY */}
          <div className="summary">
            <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>

            <div className="discount-buttons">
              <button onClick={() => setDiscountPer(10)}>10%</button>
              <button onClick={() => setDiscountPer(20)}>20%</button>
              <button onClick={() => setDiscountPer(30)}>30%</button>
              <button onClick={() => setDiscountPer(0)}>Reset</button>
            </div>

            <h4>Manual Discount: ₹{manualDiscount.toFixed(2)}</h4>

            <div className="coupon-section">
              <input
                type="text"
                placeholder="Enter coupon"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button onClick={() => dispatch(applyCoupon(input))}>
                Apply Coupon
              </button>
            </div>

            {applied && <h4>Coupon Discount: ₹{couponDiscount.toFixed(2)}</h4>}

            <h4>GST (18%): ₹{gst.toFixed(2)}</h4>
            <h2>Final Amount: ₹{finalAmount.toFixed(2)}</h2>

            {!isCheckout && (
              <button
                className="checkout-btn"
                onClick={() => setIsCheckout(true)}
              >
                Proceed to Checkout
              </button>
            )}

            {isCheckout && (
              <div className="payment-section">
                <h3>Select Payment Method</h3>

                <button onClick={() => setPaymentMethod("Card")}>Card</button>
                <button onClick={() => setPaymentMethod("QR")}>UPI QR</button>

                {paymentMethod === "QR" && (
                  <div className="qr-box">
                    <h4>Scan to Pay ₹{finalAmount.toFixed(2)}</h4>
                    <QRCode
                      value={`upi://pay?pa=9010627008@ibl&am=${finalAmount}&cu=INR`}
                      size={200}
                    />
                  </div>
                )}

                {paymentMethod === "Card" && <p>Card payment not available</p>}
              </div>
            )}

            <div className="email-box">
              <label>Enter Gmail for Order Confirmation</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <button onClick={handleCheckout}>Send Email</button>
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

