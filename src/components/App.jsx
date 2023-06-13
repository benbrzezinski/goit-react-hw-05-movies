import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SharedLayout from "./SharedLayout/SharedLayout";

const Home = lazy(() => import("./Home/Home"));

const App = () => (
  <Routes>
    <Route path="/goit-react-hw-05-movies/" element={<SharedLayout />}>
      <Route index element={<Home />} />
    </Route>
  </Routes>
);

export default App;
