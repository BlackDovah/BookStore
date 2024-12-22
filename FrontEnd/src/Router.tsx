import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '@/pages/Home.page';
import { BookListPage } from '@/pages/BookList.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/books',
    element: <BookListPage />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
