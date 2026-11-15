import { RouterProvider } from "@tanstack/react-router";
import { QueryProvider } from "./providers/query-provider";
import { router } from "./router";
import "./styles/globals.css";

export function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}
