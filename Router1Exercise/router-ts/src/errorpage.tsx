import { useRouteError } from "react-router-dom";

type ErrorType = {
  message: string;
  statusText: string;
};

const ErrorPage: React.FC = () => {
  const error: ErrorType = useRouteError() as ErrorType;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
