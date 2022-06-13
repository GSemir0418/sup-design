import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./config/routes";

const Router = () => {
  const myRoutes = routes.map((item) => {
    return (
      <Route key={item.path} path={item.path} element={<item.component />} />
    );
  });
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>{myRoutes}</Routes>
    </Suspense>
  );
};

export default Router;
