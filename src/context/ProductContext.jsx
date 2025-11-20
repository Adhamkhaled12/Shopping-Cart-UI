import { createContext, useState, useEffect, useContext } from "react";

// Creates context object - acts as global storage container
export const ProductContext = createContext();

// children that will be passed in is the entire App component in main.jsx
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    // These values could be accessed from anywhere using the useContext hook
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook used instead of repeating useContext(ProductContext) and importing then in separate lines at each component, this will make it easier to import and use it.
export function useProducts() {
  return useContext(ProductContext);
}
