import { createFileRoute } from "@tanstack/react-router";
import { GreetingPage } from "../../pages/greeting";

export const Route = createFileRoute("/greetings/$name")({
  component: GreetingRoute,
});

function GreetingRoute() {
  const { name } = Route.useParams();
  return <GreetingPage name={name} />;
}
