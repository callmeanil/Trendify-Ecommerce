import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { FaTrash } from "react-icons/fa";
const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext)

    if (cart.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="mb-4">
                    <i className="bi bi-cart-x" style={{ fontSize: "4rem" }}></i>
                </div>
                <h2>Your cart is empty</h2>
                <p className="mb-4">Looks like you haven't added any products to your cart yet.</p>
                <Link to="/" className="btn btn-primary">
                    Continue Shopping
                </Link>
            </div>
        )
    }
    return (
        <div className="cart-page">
            <h1 className="mb-4">Shopping Cart</h1>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.title}
                                                            className="cart-item-image me-3"
                                                            style={{ width: "50px", height: "50px", objectFit: "contain" }}
                                                        />
                                                        <div>
                                                            <Link to={`/product/${item.id}`} className="text-decoration-none">
                                                                {item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>${item.price.toFixed(2)}</td>
                                                <td>
                                                    <div className="input-group" style={{ width: "120px" }}>
                                                        <button
                                                            className="btn btn-outline-secondary btn-sm"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-sm text-center"
                                                            value={item.quantity}
                                                            onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                                                            min="1"
                                                        />
                                                        <button
                                                            className="btn btn-outline-secondary btn-sm"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                                                <td>
                                                    <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <Link to="/" className="btn btn-outline-primary">
                            <i className="bi bi-arrow-left me-2"></i>
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Order Summary</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal:</span>
                                <span>${getTotalPrice().toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Shipping:</span>
                                <span>Free</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-3 fw-bold">
                                <span>Total:</span>
                                <span>${getTotalPrice().toFixed(2)}</span>
                            </div>
                            <button className="btn btn-success w-100 mt-3">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
