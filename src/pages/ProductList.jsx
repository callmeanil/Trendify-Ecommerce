import { useState, useEffect } from "react";
import ProductCard from "../component/productCard";
import { fetchProducts } from "../service/Apis";
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                console.log("fetching details",data);
                setProducts(data);
                const uniqueCategories = [...new Set(data.map((product) => product.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter((product) => product.category === selectedCategory);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                Error: {error}
            </div>
        );
    }
    return (
        <div>
            <h1 className="mb-4">Our Products</h1>

            {/* Category Filter */}
            <div className="mb-4">
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <span className="fw-bold me-2">Filter by Category:</span>
                    <div className="d-flex flex-wrap gap-2">
                        <button
                            className={`btn rounded-pill px-3 py-1 shadow-sm transition ${selectedCategory === "all" ? "btn-primary" : "btn-outline-primary"
                                }`}
                            onClick={() => setSelectedCategory("all")}
                        >
                            <i className="bi bi-layers me-1"></i> All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`btn rounded-pill px-3 py-1 shadow-sm transition ${selectedCategory === category ? "btn-primary" : "btn-outline-primary"
                                    }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                <i className="bi bi-tag me-1"></i>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {/* Product Cards */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="col">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
