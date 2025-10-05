import React from 'react';
import { createRoot } from 'react-dom/client';
import AIMarketplace from './App';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<AIMarketplace />);
