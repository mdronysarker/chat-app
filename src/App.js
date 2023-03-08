import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Rootlayout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Loggedinuser from "./Privaterouter/Loggedin";
import Notloggedinuser from "./Privaterouter/Notloggedin";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Loggedinuser />}>
          <Route element={<Rootlayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
        <Route element={<Notloggedinuser />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
