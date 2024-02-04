import { useRef, useEffect, useState } from "react";
import http from "../../services/http";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigation = useNavigate()
  const [phone, setPhone] = useState();
  const [code, setCode] = useState();

  const fm = new FormData();
  fm.append("phone", phone);

  const onPhone = (e) => {
    e.preventDefault();
    http
      .post("accounts/login/", fm)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCode = (e) => {
    e.preventDefault();
    http
      .post("accounts/login-confirm/", {
        phone: phone,
        code: code
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message)
      });
  };

  return (
    <div className="container">
      <Link to="/register">Registratsiya qilish uchun</Link>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card mt-5">
            <div className="card-header">
              <h2>Login Page</h2>
            </div>
            <div className="card-body">
              <form onSubmit={onPhone}>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    // aria-describedby="emailHelp"
                    onInput={(e) => setPhone(e.target.value)}
                  />
                  {/* <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div> */}
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>

              <form onSubmit={onCode}>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onInput={(e) => setCode(e.target.value)}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default Login;
