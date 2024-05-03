import App from "./app.js";
import Login from "./login.js";

import {UserProvider} from "./services/user-context.js";

import ReactDOM from "react-dom/client";
import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
//root.render(<App />);

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
if (!params.showssr && !document.body.classList.contains('static')) {
root.render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
  );
}
