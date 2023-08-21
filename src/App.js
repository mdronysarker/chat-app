import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Rootlayout from "./Layout";
import Forget from "./pages/Forgotpassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Loggedinuser from "./Privaterouter/Loggedin";
import Notloggedinuser from "./Privaterouter/Notloggedin";
import Message from "./pages/Message";
import Accountinfo from "./pages/Accountinfo";
import { Notification } from "./pages/Notification";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Loggedinuser />}>
          <Route element={<Rootlayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/message" element={<Message />} />
            <Route path="/notification" element={<Notification />}></Route>
            <Route path="/accountinfo" element={<Accountinfo />} />
          </Route>
        </Route>
        <Route element={<Notloggedinuser />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forget />} />
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
