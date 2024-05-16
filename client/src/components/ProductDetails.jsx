import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetails = ({ onProductDeleted }) => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      const callback = () => {
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
        navigate("/");
      };

      await onProductDeleted(id, callback);
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire("Error", "Failed to delete product.", "error");
    }
  };

  if (!product) {
    return <div className="container">Cargando...</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>
            <strong>Precio:</strong> ${product.price}
          </p>
          <p>
            <strong>Descripción:</strong> {product.description}
          </p>
          <div className="mb-3">
            <button className="btn btn-danger mr-2" onClick={handleDelete}>
              Delete
            </button>
            <Link to="/" className="btn btn-primary mr-2">
              Volver al listado
            </Link>
            <Link to={`/products/${id}/edit`} className="btn btn-warning">
              Editar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
