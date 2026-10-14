import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./routes/Home/index.tsx";
import Produtos from "./routes/Produtos/index.tsx";
import CadastrarProduto from "./routes/CadastrarProduto/index.tsx";
import EditarProdutos from "./routes/EditarProdutos/index.tsx";
import Error from "./routes/Error/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/produtos", element: <Produtos /> },
      { path: "/Produtos", element: <Produtos /> },
      { path: "/cadastrar-produto", element: <CadastrarProduto /> },
      { path: "/CadastrarProduto", element: <CadastrarProduto /> },
      { path: "/editar-produtos/:id", element: <EditarProdutos /> },
      { path: "/EditarProdutos/:id", element: <EditarProdutos /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
