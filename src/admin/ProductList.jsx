import React, { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { deleteProduct, fetchProducts, findAgeGroup, imgSrc, updateProduct } from '../api';
import ProductForm from './ProductForm';

const EDITABLE_FIELDS = ['name', 'price', 'wrappingPrice', 'img', 'url', 'branch', 'ageGroups', 'gender'];

const pick = (obj, keys) =>
  Object.fromEntries(keys.map((k) => [k, obj[k] ?? (k === 'ageGroups' ? [] : '')]));

function ProductList() {
  const { handleApiError } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError('Could not load products.'))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter(
      (p) => (!q || p.name.toLowerCase().includes(q)) && (!branchFilter || p.branch === branchFilter)
    );
  }, [products, search, branchFilter]);

  const handleSave = async (values) => {
    const updated = await updateProduct(editing._id, pick(values, EDITABLE_FIELDS));
    setProducts((list) => list.map((p) => (p._id === updated._id ? updated : p)));
    setEditing(null);
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete “${product.name}”? It will be removed from the catalog.`)) return;
    setDeletingId(product._id);
    try {
      await deleteProduct(product._id);
      setProducts((list) => list.filter((p) => p._id !== product._id));
    } catch (err) {
      if (!handleApiError(err)) window.alert(err.message);
    }
    setDeletingId(null);
  };

  return (
    <section className="admin-card">
      <div className="list-header">
        <h2>Products <span className="count">{products.length}</span></h2>
        <div className="list-filters">
          <input
            type="search"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}>
            <option value="">All branches</option>
            <option value="All">Both (All)</option>
            <option value="Lekki">Lekki only</option>
            <option value="Ikoyi">Ikoyi only</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading products…</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && !error && visible.length === 0 && <p>No products found.</p>}

      <ul className="product-list">
        {visible.map((p) => (
          <li key={p._id} className="product-row">
            <img src={imgSrc(p.img)} alt={p.name} className="product-thumb" loading="lazy" />
            <div className="product-info">
              <div className="product-name">{p.name}</div>
              <div className="product-price">
                {p.price}
                {p.wrappingPrice && <span className="muted"> · Wrapping {p.wrappingPrice}</span>}
              </div>
              <div className="product-tags">
                <span className="tag">{p.branch === 'All' ? 'Lekki & Ikoyi' : p.branch}</span>
                {(p.ageGroups || []).map((age) => (
                  <span key={age} className="tag">{findAgeGroup(age)?.label ?? age}</span>
                ))}
                {p.gender && <span className="tag">{p.gender === 'boys' ? 'Boys' : 'Girls'}</span>}
              </div>
            </div>
            <div className="product-actions">
              <button className="btn btn-light" onClick={() => setEditing(p)}>Edit</button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(p)}
                disabled={deletingId === p._id}
              >
                {deletingId === p._id ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <button className="admin-modal-close" onClick={() => setEditing(null)} aria-label="Close">✖</button>
            <h2>Edit Product</h2>
            <ProductForm
              initial={pick(editing, EDITABLE_FIELDS)}
              submitLabel="Save Changes"
              submittingLabel="Saving…"
              onSubmit={handleSave}
              onApiError={handleApiError}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductList;
