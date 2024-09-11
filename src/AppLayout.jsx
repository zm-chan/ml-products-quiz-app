import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <main className="bg-fuchsia-100 p-4 md:p-8">
      <h1 className="text-center text-4xl font-bold text-fuchsia-700">
        Michelle Lazar Products Quiz App
      </h1>
      <Outlet />
    </main>
  );
}

export default AppLayout;
