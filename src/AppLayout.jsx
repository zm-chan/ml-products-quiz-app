import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <main className="h-full bg-fuchsia-100 p-4 lg:h-screen">
      <h1 className="text-center text-4xl font-bold text-fuchsia-700">
        Michelle Lazar Products Quiz App
      </h1>
      <Outlet />
    </main>
  );
}

export default AppLayout;
