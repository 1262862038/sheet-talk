import { XProvider } from '@ant-design/x';
import '@douyinfe/semi-ui/dist/css/semi.css';
import './App.css';
import { createBrowserRouter, Outlet, Router, RouterProvider } from 'react-router-dom';
import Index from './pages/index';
import Chat from './pages/chat';
import Layout from './layout';
import Excel from './pages/excel';

  const App = () => {



    const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // 父路由使用布局组件
    children: [
      { path: '', element: <Index /> }, // 根路径的子路由（默认显示首页）
      { path: '/chat', element: <Chat /> }, // 根路径的子路由（默认显示首页）
      { path: '/excel', element: <Excel /> }, // 根路径的子路由（默认显示首页）

    ],
  },
  { path: '*', element: <div>notFound</div> },
]);

  return (
    <RouterProvider router={router}>

      </RouterProvider>

  );
};

export default App;
