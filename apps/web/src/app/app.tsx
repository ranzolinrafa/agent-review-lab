import { HomePage } from "../pages/home";
import { QueryProvider } from "./providers/query-provider";
import "./styles/globals.css";

export function App() {
  return (
    <QueryProvider>
      <HomePage />
    </QueryProvider>
  );
}
