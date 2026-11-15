import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { greetingQueryOptions } from "../../../shared/api/greeting-query";
import { isApiClientError } from "../../../shared/api/trpc";
import "./greeting-page.css";

type GreetingPageProps = {
  name: string;
};

export function GreetingPage({ name }: GreetingPageProps) {
  const greetingQuery = useQuery(greetingQueryOptions(name));
  const error = greetingQuery.error;
  const errorMessage =
    isApiClientError(error) && error.data
      ? (error.data.validationIssues?.[0]?.message ?? error.message)
      : "Não foi possível consultar a API. Tente novamente.";

  return (
    <main className="greeting-page">
      <h1>Saudação para {name}</h1>
      <p role="status">
        {greetingQuery.isFetching
          ? "Aguardando resposta da API..."
          : greetingQuery.data?.message}
      </p>
      {greetingQuery.isError && <p role="alert">{errorMessage}</p>}
      <Link to="/">Voltar para a home</Link>
    </main>
  );
}
