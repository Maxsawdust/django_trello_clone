import { Suspense } from "react";
import { useRoutes } from "react-router";
import routes from "~react-pages";

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="h-screen w-screen flex justify-center items-center">
        {useRoutes(routes)}
      </div>
    </Suspense>
  );
}
