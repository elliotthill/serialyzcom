import App from "./app.js";
import Login from "./login.js";
import Register from "./register.js";
import { Dashboard } from "./dashboard.js";
import { Try } from "./try.js";
import {UserProvider} from "./services/user-context.js";

import ReactDOM, { hydrateRoot } from "react-dom/client";
import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: '/',
    element: <App data={{data:null}}/>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/try',
    element: <Try />
  },

]);

const rootElement = document.getElementById("root")!;


if (!document.body.classList.contains('static')) {

    if (document.body.classList.contains('hydrate')) {

       hydrateRoot(
        rootElement,
        <UserProvider>
                <RouterProvider router={router} />
        </UserProvider>
       );

    } else {
        const root = ReactDOM.createRoot(rootElement);

        root.render(
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        );
    }
}
