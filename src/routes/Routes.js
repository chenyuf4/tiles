import { Route, Routes } from "react-router-dom";
import AppHome from "features/AppHome/AppHome";
const RoutesPath = () => {
  const routePaths = [
    {
      name: "appHome",
      path: "/",
      exact: false,
      element: <AppHome />,
    },
  ];
  return (
    <Routes>
      {routePaths.map((item) => (
        <Route
          exact={item.exact}
          element={item.element}
          path={item.path}
          key={item.name}
        ></Route>
      ))}
    </Routes>
  );
};
export default RoutesPath;
