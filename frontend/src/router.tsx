import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import View from './pages/View';
import EditItem from './pages/Edit';
// import NotFound from './pages/NotFound';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/create', element: <Create /> }, 
  { path: '/:id', element: <View /> },
  { path: '/:id/view', element: <View /> }, 
  { path: '/:id/edit', element: <EditItem /> },
//   { path: '*', element: <NotFound /> }, // 404
];

const router = createBrowserRouter(routes);

export default router;
