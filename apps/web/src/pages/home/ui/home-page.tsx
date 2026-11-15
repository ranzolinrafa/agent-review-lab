import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { greetingQueryOptions } from "../../../shared/api/greeting-query";
import { isApiClientError } from "../../../shared/api/trpc";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./home-page.css";

export function HomePage() {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const greetingQuery = useQuery(greetingQueryOptions(submittedName));
  const error = greetingQuery.error;
  const errorMessage =
    isApiClientError(error) && error.data
      ? (error.data.validationIssues?.[0]?.message ?? error.message)
      : "Não foi possível consultar a API. Tente novamente.";

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
            if (name === submittedName) {
              void greetingQuery.refetch();
            } else {
              setSubmittedName(name);
            }
          }}
        >
          <label htmlFor="greeting-name">Nome fictício</label>
          <input
            id="greeting-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={greetingQuery.isFetching}
          />
          <button
            type="submit"
            className="greeting-submit"
            disabled={greetingQuery.isFetching}
          >
            {greetingQuery.isFetching ? "Consultando..." : "Consultar saudação"}
          </button>
        </form>
        <p role="status">
          {submittedName === null && "Aguardando consulta."}
          {greetingQuery.isFetching && "Aguardando resposta da API..."}
          {!greetingQuery.isFetching && greetingQuery.data?.message}
        </p>
        {greetingQuery.isError && <p role="alert">{errorMessage}</p>}
        {greetingQuery.isSuccess && submittedName !== null && (
          <Link to="/greetings/$name" params={{ name: submittedName }}>
            Abrir saudação por URL
          </Link>
        )}
      </section>
    </main>
  );
}
