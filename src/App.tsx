// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import type { JSX } from 'react/jsx-runtime';

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
