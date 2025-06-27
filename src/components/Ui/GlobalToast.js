'use client';

import { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';

// Simple global toast functions
let toastHandler = null;

export const toast = {
  success: (msg) => toastHandler?.('success', msg),
  error: (msg) => toastHandler?.('danger', msg),
  warning: (msg) => toastHandler?.('warning', msg),
  info: (msg) => toastHandler?.('info', msg)
};

export default function GlobalToast() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');

  useEffect(() => {
    toastHandler = (type, msg) => {
      setVariant(type);
      setMessage(msg);
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    };
  }, []);

  const bgColor = ['success', 'danger', 'warning', 'info'].includes(variant) ? `bg-${variant}` : 'bg-secondary';

  const title =
    {
      success: 'Success',
      danger: 'Error',
      warning: 'Warning',
      info: 'Info'
    }[variant] || 'Notification';

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <Toast className={`${bgColor} text-white`} show={show} onClose={() => setShow(false)} autohide delay={3000}>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
}
