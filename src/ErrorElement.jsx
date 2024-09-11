import { Link, useRouteError } from "react-router-dom";
import { buttonGeneralClassName, buttonVariants } from "./ui";

function ErrorElement() {
  const error = useRouteError();

  //   console.log(error);
  console.log(error.data);

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    // message = JSON.parse(error.data).message;
    // message = error.data.message;
    message = error.message;
  }

  if (error.status === 404) {
    title = "Page Not found";
    message = "Could not find resource or page";
  }

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold text-fuchsia-300 lg:text-4xl">
          {title}
        </h1>
        {/* lg:text-slate-400 */}
        <p className="text-fuchsia-400 lg:text-2xl">{message}</p>
        <button
          className={
            buttonGeneralClassName +
            " " +
            buttonVariants.default +
            " " +
            " lg:px-4 lg:py-6 lg:text-lg"
          }
        >
          <Link to={"/"}>Go Back Home</Link>
        </button>
      </div>
    </div>
  );
}

export default ErrorElement;
