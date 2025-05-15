import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"

const Header = () => {
  const { getCartItemsCount } = useContext(CartContext)

  return (
    <header className="bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
          Aliste Technologies Web
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <i className="bi bi-cart-fill me-1"></i>
                  Cart
                  {getCartItemsCount() > 0 && (
                    <span className="badge bg-primary ms-1 rounded-pill">{getCartItemsCount()}</span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
