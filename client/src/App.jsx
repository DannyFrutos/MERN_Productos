import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import EditProductForm from "./components/EditProductForm";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/products",
        newProduct
      );
      if (response.status === 201) {
        console.log("Product created successfully");
        fetchProducts();
      } else {
        throw new Error("Error creating product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDeleteProduct = async (productId, callback) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/products/${productId}`
      );
      if (response.status === 200) {
        console.log("Product deleted successfully");
        await fetchProducts();
        if (callback) callback();
      } else {
        throw new Error("Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductForm onSubmit={handleAddProduct} />
                <ProductList
                  products={products}
                  onDelete={handleDeleteProduct}
                />
              </>
            }
          />
          <Route
            path="/products/:id"
            element={<ProductDetails onProductDeleted={handleDeleteProduct} />}
          />
          <Route path="/products/:id/edit" element={<EditProductForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
