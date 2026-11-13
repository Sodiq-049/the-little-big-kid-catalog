import React, { useEffect, useRef, useState } from 'react';
import { AGE_GROUPS, BRANCHES, GENDERS, imgSrc, uploadImage } from '../api';
import resizeImage from './resizeImage';

const emptyProduct = {
  name: '',
  price: '',
  wrappingPrice: '',
  url: '',
  branch: 'All',
  ageGroups: [],
  gender: '',
  img: '',
};

// Shared by the Add Product page and the Edit Product popup.
// onSubmit receives the product fields (with img set to the uploaded photo when a new one was taken).
// onApiError returns true when it has handled an error itself (e.g. an expired session).
function ProductForm({ initial, submitLabel, submittingLabel, onSubmit, onApiError, onCancel }) {
  const [values, setValues] = useState({ ...emptyProduct, ...initial });
  const [photo, setPhoto] = useState(null); // resized Blob waiting to be uploaded
  const [preview, setPreview] = useState(initial?.img ? imgSrc(initial.img) : '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const cameraInput = useRef(null);
  const galleryInput = useRef(null);

  // Free the object URL for the previous preview
  useEffect(() => {
    return () => {
      if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const setField = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const toggleAge = (key) =>
    setValues((v) => ({
      ...v,
      ageGroups: v.ageGroups.includes(key) ? v.ageGroups.filter((a) => a !== key) : [...v.ageGroups, key],
    }));

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow picking the same file again
    if (!file) return;
    setError('');
    try {
      const blob = await resizeImage(file);
      setPhoto(blob);
      setPreview(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!photo && !values.img) return setError('Please take or upload a picture of the item.');
    if (!values.name.trim()) return setError('Please enter the item name.');
    if (!values.price.trim()) return setError('Please enter the price.');
    if (!values.ageGroups.length && !values.gender) return setError('Please select at least one age.');

    setSubmitting(true);
    try {
      let img = values.img;
      if (photo) img = (await uploadImage(photo)).url;
      await onSubmit({ ...values, img });
    } catch (err) {
      if (!onApiError?.(err)) setError(err.message);
    }
    setSubmitting(false);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Picture</label>
        <div className="photo-picker">
          {preview ? (
            <img src={preview} alt="Product preview" className="photo-preview" />
          ) : (
            <div className="photo-placeholder">No picture yet</div>
          )}
          <div className="photo-buttons">
            <button type="button" className="btn btn-primary" onClick={() => cameraInput.current.click()}>
              📷 {preview ? 'Retake Picture' : 'Take Picture'}
            </button>
            <button type="button" className="btn btn-light" onClick={() => galleryInput.current.click()}>
              Upload from Gallery
            </button>
          </div>
          {/* capture="environment" opens the back camera directly on phones */}
          <input ref={cameraInput} type="file" accept="image/*" capture="environment" hidden onChange={handlePhoto} />
          <input ref={galleryInput} type="file" accept="image/*" hidden onChange={handlePhoto} />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="pf-name">Item name</label>
        <input id="pf-name" value={values.name} onChange={setField('name')} placeholder="e.g. Wooden toy set" />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="pf-price">Price (₦)</label>
          <input id="pf-price" inputMode="numeric" value={values.price} onChange={setField('price')} placeholder="e.g. 45000" />
        </div>
        <div className="form-field">
          <label htmlFor="pf-wrap">Wrapping price (₦)</label>
          <input id="pf-wrap" inputMode="numeric" value={values.wrappingPrice} onChange={setField('wrappingPrice')} placeholder="e.g. 5000" />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="pf-url">Link <span className="optional">(optional)</span></label>
        <input id="pf-url" type="url" value={values.url} onChange={setField('url')} placeholder="https://thelittlebigkidcompany.com/products/..." />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="pf-branch">Branch</label>
          <select id="pf-branch" value={values.branch} onChange={setField('branch')}>
            {BRANCHES.map((b) => (
              <option key={b} value={b}>{b === 'All' ? 'All (Lekki & Ikoyi)' : b}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="pf-gender">Shop by Gender <span className="optional">(optional)</span></label>
          <select id="pf-gender" value={values.gender} onChange={setField('gender')}>
            <option value="">Not in Shop by Gender</option>
            {GENDERS.map((g) => (
              <option key={g} value={g}>{g === 'boys' ? 'Boys' : 'Girls'}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="form-field age-picker">
        <legend>Age <span className="optional">(select all that apply)</span></legend>
        <div className="age-options">
          {AGE_GROUPS.map(({ key, label }) => (
            <label key={key} className={`age-option${values.ageGroups.includes(key) ? ' selected' : ''}`}>
              <input type="checkbox" checked={values.ageGroups.includes(key)} onChange={() => toggleAge(key)} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn btn-light" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary btn-wide" disabled={submitting}>
          {submitting ? submittingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
