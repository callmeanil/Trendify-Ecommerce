import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Header from "./component/Header"
import Footer from "./component/Footer"
import ProductList from "./pages/ProductList"
import ProductDetail from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1 py-4">
            <div className="container">
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  )
}

export default App
