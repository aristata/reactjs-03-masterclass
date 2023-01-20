# ch 04 React-Router

## 설치

```
npm i react-router-dom
```

## Router 파일 만들기

```javascript
import { BrowserRouter, Route, Routes } from "react-router-dom";

<BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>;
```

![Alt text](public/images/20230120_home.png)

![Alt text](public/images/20230120_about.png)
