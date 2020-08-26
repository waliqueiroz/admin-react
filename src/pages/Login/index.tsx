import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { signInRequest } from '../../store/modules/auth/actions';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  function handleSingIn(e: FormEvent) {
    e.preventDefault();
    dispatch(signInRequest(email, password));
  }

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <span>
            <b>SUPERMERCADO</b> NOW
          </span>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Faça login para iniciar sua sessão</p>

            <form onSubmit={handleSingIn}>
              <div className="input-group mb-3">
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  placeholder="Senha"
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Entrar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
