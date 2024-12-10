import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import { App } from './App';
import { Register } from './RegisterUser';
import { AdministratorView } from './AdministratorView';
import { CreateTasks } from './CreateTasks';
import { UserView } from './UserView';
import { UserTasks } from './UserTasks';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:"/Register",
    element: <Register/>
  },
  {
    path:"/Admin",
    element: <AdministratorView/>
  },
  {
    path:"/Inicio",
    element: <UserView/>
  },
  {
    path:"/CrearTarea",
    element: <CreateTasks/>
  },
  {
    path:"/MisTareas",
    element: <UserTasks/>
  }
]);

const user = localStorage.user ? JSON.parse(localStorage.user): undefined;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <>
      {
        user?.logined == true && (
        <></>
        )
      }
      <RouterProvider router={router} />
    </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
