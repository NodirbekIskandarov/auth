import { useRef, useEffect, useState } from "react";
import http from "../../services/http";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigation = useNavigate()
  const [regInput, setRegInput] = useState();
  const [codeInput, setCodeInput] = useState();

  const fm = new FormData();
  fm.append("phone", regInput);

  const fc = new FormData()
  fc.append("code", codeInput)
  fc.append("phone", regInput)

  const onPhone = (e) => {

    e.preventDefault();
    
    http
      .post("accounts/register/", fm)
      .then((res) => {
        console.log(res);
        alert(res.status)
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message)

      });
  };

  const onCode = (e) => {

    e.preventDefault();
    if(localStorage.getItem("token")) {
        navigation("/")
    }
    
    http
      .post("accounts/register-confirm/", fc)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <Link to="/">Login qilish uchun</Link>

      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card mt-5">
            <div className="card-header">
              <h2>Register Page</h2>
            </div>
            <div className="card-body">
              <form onSubmit={onPhone}>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Phone number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onInput={(e) => setRegInput(e.target.value)}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>

              <form onSubmit={onCode}>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Phone number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onInput={(e) => setCodeInput(e.target.value)}
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

export default Register;
