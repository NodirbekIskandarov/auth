import { Suspense, lazy, useState } from "react";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Auth/Login"));
const RegisterPage = lazy(() => import("./pages/Auth/Register"));

function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  return (
    <div>
      <Suspense fallback={<h1>error from react</h1>}>
        <BrowserRouter>
          <Routes>
            {token ? (
              <Route path="/" element={<HomePage />} />
            ) : (
              <Route path="/" element={<LoginPage />} />
            )}
            <Route path="/register" element={<RegisterPage />}/>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
