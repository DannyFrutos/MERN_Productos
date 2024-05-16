import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    description: Yup.string().required('Description is required'),
});

const ProductForm = ({ onSubmit }) => {
    const initialValues = {
        title: '',
        price: '',
        description: '',
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        onSubmit(values);
        setSubmitting(false);
        resetForm();
    };

    return (
        <div className="d-flex justify-content-center">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="container">
                        <h1 className="row justify-content-center align-items-center">Product Manager</h1>
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        placeholder="Product Title"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <Field
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        placeholder="Product Price"
                                    />
                                    <ErrorMessage name="price" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <Field
                                        as="textarea"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        placeholder="Product Description"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        Add Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProductForm;
