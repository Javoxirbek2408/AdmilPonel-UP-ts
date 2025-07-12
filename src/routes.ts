// src/routes.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import { DashboardLayout } from '@/layouts/DashbordLayout';
import { ProtectedRoute } from '@/components/protected';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProductsPage from '@/pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import RecipesPage from './pages/RecipesPage/RecipesPage';
import PostsPage from './pages/PostsPage/PostsPage';

const router = createBrowserRouter([
  {
    path: '/auth/signin',
    element: <ProtectedRoute onlyUnauthenticated />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'products',
            element: <ProductsPage />,
          },
          {
            path: 'cart',
            element: <CartPage />,
          },
          {
            path: 'recipes',
            element: <RecipesPage />,
          },
          {
            path: 'posts',
            element: <PostsPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to="/" />,
  },
]);

export default router;
