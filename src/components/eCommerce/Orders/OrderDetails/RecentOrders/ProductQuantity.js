'use client';

import React from 'react';
import { Form } from 'react-bootstrap';

function ProductQuantity({ counts }) {
  return (
    <div className="product-quantity">
      <div className="add-to-cart-counter d-flex align-items-center">
        <Form.Control type="text" size="sm" value={counts} readOnly className="text-center count" />
      </div>
    </div>
  );
}

export default ProductQuantity;
