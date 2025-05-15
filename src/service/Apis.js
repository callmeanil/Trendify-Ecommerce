// services/api.js
export const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

export const fetchProductById = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  
      if (!response.ok) {
        throw new Error("Product not found");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  