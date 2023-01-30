import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Coin from "../pages/Coin";
import Coins from "../pages/Coins";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "coins",
        element: <Coins />
      },
      {
        path: ":coinId",
        element: <Coin />
      }
    ]
  }
]);

export default Router;
