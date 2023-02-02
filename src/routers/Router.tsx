import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Coin from "../pages/Coin";
import Coins from "../pages/Coins";
import Chart from "../screens/Chart";
import Price from "../screens/Price";

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
        element: <Coin />,
        children: [
          {
            path: "price",
            element: <Price />
          },
          {
            path: "chart",
            element: <Chart />
          }
        ]
      }
    ]
  }
]);

export default Router;
