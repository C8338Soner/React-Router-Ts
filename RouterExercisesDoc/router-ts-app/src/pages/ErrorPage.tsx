import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  function isError(error: any): error is { message: string; statusText: string
} {
    return "statusText" in error;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{isError(error) && <i>{error.statusText||error.message}</i>}</p>
    </div>
  );
}
