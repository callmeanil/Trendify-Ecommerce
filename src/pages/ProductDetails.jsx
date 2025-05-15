import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import RatingStars from "../component/RatingStar"
import { CartContext } from "../context/CartContext"
import Swal from 'sweetalert2';
import { fetchProductById } from "../service/Apis"
const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useContext(CartContext)

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const data = await fetchProductById(id)
                console.log("fetching details",data);
                setProduct(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        Swal.fire({
            icon: 'success',
            title: 'Add to Cart?',
            text: `Do you want to add ${product.title} to your cart?`,
            showCancelButton: true,
            confirmButtonText: 'Yes, add it!',
        }).then((result) => {
            if (result.isConfirmed) {
                addToCart(product, quantity);
                Swal.fire('Added!', `${product.title} has been added.`, 'success');
            }
        });
    };

    const handleQuantityChange = (e) => {
        const value = Number.parseInt(e.target.value)
        setQuantity(value > 0 ? value : 1)
    }

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading product details...</p>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="alert alert-danger" role="alert">
                Error: {error || "Product not found"}
                <button className="btn btn-outline-primary ms-3" onClick={() => navigate("/")}>
                    Back to Products
                </button>
            </div>
        )
    }

    return (
        <div className="product-detail">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body text-center p-4">
                            <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.title}
                                className="img-fluid product-detail-image"
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <h1 className="mb-3">{product.title}</h1>

                    <div className="mb-3">
                        <RatingStars rating={product.rating.rate} count={product.rating.count} />
                    </div>

                    <h2 className="text-primary mb-4">${product.price.toFixed(2)}</h2>

                    <p className="mb-4">{product.description}</p>

                    <div className="d-flex align-items-center mb-4">
                        <label htmlFor="quantity" className="me-3 fw-bold">
                            Quantity:
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            className="form-control me-3"
                            style={{ width: "80px" }}
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                        <button className="btn btn-primary" onClick={handleAddToCart}>
                            <i className="bi bi-cart-plus me-2"></i>
                            Add to Cart
                        </button>
                    </div>

                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Product Details</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Category:</span>
                                    <span className="text-capitalize">{product.category}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Rating:</span>
                                    <span>{product.rating.rate} out of 5</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Reviews:</span>
                                    <span>{product.rating.count}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button className="btn btn-outline-secondary mt-4" onClick={() => navigate("/")}>
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Products
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ProductDetail
