import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App_current';

// const url = 'https://dobrovershnyk.online/api/get.php';
const url = '/api/get.php/';
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App url={url} />);
} else {
  console.error('Root container not found');
}
