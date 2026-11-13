import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { createProduct } from '../api';
import ProductForm from './ProductForm';

function AddProduct() {
  const { handleApiError } = useOutletContext();
  const [published, setPublished] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const handlePublish = async (values) => {
    const product = await createProduct(values);
    setPublished(product);
    setFormKey((k) => k + 1); // reset the form for the next item
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="admin-card">
      <h2>Add Product</h2>

      {published && (
        <div className="form-success">
          “{published.name}” is now live in {published.branch === 'All' ? 'Lekki and Ikoyi' : published.branch}.{' '}
          <Link to="../products">View all products</Link>
        </div>
      )}

      <ProductForm
        key={formKey}
        submitLabel="Publish"
        submittingLabel="Publishing…"
        onSubmit={handlePublish}
        onApiError={handleApiError}
      />
    </section>
  );
}

export default AddProduct;
