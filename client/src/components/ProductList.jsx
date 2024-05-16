import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductList = ({ products, onDelete }) => {
    const handleDelete = (productId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(productId); // Aquí se llama a la función onDelete con el ID del producto
                Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your product is safe :)', 'error');
            }
        });
    };

    return (
        <div className="container">
            <h3 className="text-center mb-4">All Products:</h3>
            <div className="row">
                {products.map((product) => (
                    <div className="md-4 mb-3" key={product._id}>
                        <Link to={`/products/${product._id}`} className="card-title">
                            {product.title}
                        </Link>
                        <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
