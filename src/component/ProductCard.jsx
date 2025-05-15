import { Link } from "react-router-dom"
const ProductCard = ({ product }) => {
  const { id, title, price, image, rating } = product
  const truncatedTitle = title.length > 50 ? `${title.substring(0, 50)}...` : title
  return (
    <div className="card h-100 product-card">
      <div className="card-img-container p-3 text-center">
        <img src={image || "/placeholder.svg"} className="card-img-top product-image" alt={title} />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{truncatedTitle}</h5>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-bold text-primary">${price.toFixed(2)}</span>
          <div className="rating">
            <span className="text-warning me-1">
              <i className="bi bi-star-fill"></i>
            </span>
            <span>
              {rating.rate} ({rating.count})
            </span>
          </div>
        </div>
        <Link to={`/product/${id}`} className="btn btn-outline-primary mt-auto">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
