import { TRPCClientError } from "@trpc/client";
import { useState } from "react";
import { api } from "../../../shared/api/trpc";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./home-page.css";

type ApiResult =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function HomePage() {
  const [name, setName] = useState("");
  const [apiResult, setApiResult] = useState<ApiResult>({ status: "idle" });

  async function handleApiRequest() {
    setApiResult({ status: "loading" });

    try {
      const result = await api.greeting.hello.query({ name });
      setApiResult({ status: "success", message: result.message });
    } catch (error) {
      const message =
        error instanceof TRPCClientError && error.data?.code === "BAD_REQUEST"
          ? "Informe um nome com pelo menos um caractere que não seja espaço."
          : "Não foi possível consultar a API. Verifique se ela está em execução e tente novamente.";
      setApiResult({ status: "error", message });
    }
  }

  return (
    <main className="home-page">
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="" />
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
      </div>

      <section className="api-demo" aria-labelledby="api-heading">
        <h1 id="api-heading">Saudação pela API tipada</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleApiRequest();
          }}
        >
          <label htmlFor="greeting-name">Nome fictício</label>
          <input
            id="greeting-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={apiResult.status === "loading"}
          />
          <button
            type="submit"
            className="greeting-submit"
            disabled={apiResult.status === "loading"}
          >
            {apiResult.status === "loading"
              ? "Consultando..."
              : "Consultar saudação"}
          </button>
        </form>
        <p role="status">
          {apiResult.status === "idle" && "Aguardando consulta."}
          {apiResult.status === "loading" && "Aguardando resposta da API..."}
          {apiResult.status === "success" && apiResult.message}
        </p>
        {apiResult.status === "error" && (
          <p role="alert">{apiResult.message}</p>
        )}
      </section>
    </main>
  );
}
