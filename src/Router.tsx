import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./screens/Home";
import About from "./screens/About";
import Root from "./Root";

/* 
  React Router v6 이전
  BrowserRouter 를 JSX 방식으로 생성한 다음 Router 컴포넌트를 App 에 삽입하여 사용하였다
 */
// const Router = () => {
//   return (
//     <BrowserRouter>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

/*
  React Router v6 부터
  createBrowserRouter 를 사용하여 함수형으로 Router 컴포넌트를 작성한다
  배열을 사용하여 정의하기 때문에 훨신 불필요한 코드들이 줄어들었다
 */
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      }
    ]
  }
]);

export default Router;
