import React, { useState, useEffect } from 'react';
import { getProductTypes, getColours, createProduct } from '../api/productApi';

export default function ProductForm() {
  const [name, setName] = useState('');
  const [productTypeId, setProductTypeId] = useState('');
  const [selectedColours, setSelectedColours] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [colours, setColours] = useState([]);
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const types = await getProductTypes();
        const colours = await getColours();
        setProductTypes(types);
        setColours(colours);
      } catch (err) {
        setError('Failed to load form options.');
        console.error(err);
      }
    };
    loadOptions();
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    const isValid = /^[A-Za-z\s]*$/.test(value);
    if (isValid) {
      setName(value);
      setNameError(null);
    } else {
      setNameError('Only letters and spaces are allowed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name || nameError) {
      setError('Please enter a valid name without numbers or symbols.');
      return;
    }

    try {
      await createProduct({
        name,
        productTypeId: parseInt(productTypeId),
        colourIds: selectedColours.map(id => parseInt(id))
      });
      setSuccess(true);
      setName('');
      setProductTypeId('');
      setSelectedColours([]);
    } catch (err) {
      console.error('Create product failed:', err);
      setError('Failed to create product. Check server connection.');
    }
  };

  const handleColourToggle = (colourId) => {
    setSelectedColours(prev =>
      prev.includes(colourId)
        ? prev.filter(id => id !== colourId)
        : [...prev, colourId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Create Product</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Product created successfully!</p>}

      <div className="form-group">
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />
        {nameError && <p style={{ color: 'red', marginTop: '4px' }}>{nameError}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="productType">Product Type:</label>
        <select
          id="productType"
          value={productTypeId}
          onChange={(e) => setProductTypeId(e.target.value)}
          required
        >
          <option value="">Select a type</option>
          {productTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend>Colours</legend>
        <div className="colour-options">
          {colours.map(colour => (
            <label key={colour.id} style={{ display: 'block', marginBottom: '6px' }}>
              <input
                type="checkbox"
                checked={selectedColours.includes(colour.id)}
                onChange={() => handleColourToggle(colour.id)}
              />
              {colour.name}
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit">Create Product</button>
    </form>
  );
}
