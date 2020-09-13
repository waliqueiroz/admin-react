/* eslint-disable camelcase */
import React, { useState, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { roles } from '../../util/constants';
import history from '../../services/history';
import { showSuccessMessage, showErrorMessages } from '../../util/helpers';
import api from '../../services/api';

export interface UserData {
  name: string;
  email: string;
  role: string;
  password: string;
  password_confirmation: string;
}

const UserForm: React.FC = () => {
  const [cardTitle, setCardTitle] = useState('Cadastrar produto');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const { id: userId } = useParams();

  async function store(userData: UserData) {
    try {
      await api.post('/users', userData);

      showSuccessMessage(`Usuário cadastrado com sucesso!`);
      history.push('/users');
    } catch (error) {
      showErrorMessages(error);
    }
  }

  async function update(userData: UserData) {
    try {
      await api.put(`/users/${userId}`, userData);

      showSuccessMessage(`Usuário atualizado com sucesso!`);
      history.push('/users');
    } catch (error) {
      showErrorMessages(error);
    }
  }

  function save(e: FormEvent) {
    e.preventDefault();

    const userData = {
      name,
      email,
      role,
      password,
      password_confirmation,
    };

    if (userId) {
      update(userData);
    } else {
      store(userData);
    }
  }

  async function getUser(id: number) {
    const response = await api.get(`/users/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setRole(response.data.role);
  }

  useEffect(() => {
    if (userId) {
      setCardTitle('Editar usuário');
      getUser(userId);
    }
  }, [userId]);

  return (
    <div className="card card-default">
      <div className="card-header">
        <h3 className="card-title">{cardTitle}</h3>
      </div>
      <form onSubmit={save}>
        <div className="card-body">
          <div className="row">
            <div className="form-group col-sm-4">
              <label htmlFor="name">Nome</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                id="name"
                required
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="email">E-mail</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                required
                type="email"
                className="form-control"
              />
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="role">Nível</label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                id="role"
                required
                className="form-control"
              >
                <option value="">Selecione o nível...</option>
                {roles.map((curretRole: string) => {
                  return (
                    <option key={curretRole} value={curretRole}>
                      {curretRole}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              <label htmlFor="password">Senha</label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                required={!userId}
                type="password"
                className="form-control"
              />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="password-confirmation">Repita a senha</label>
              <input
                value={password_confirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                }}
                id="password-confirmation"
                required={!userId}
                type="password"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-sm-12">
              <button
                onClick={() => {
                  history.go(-1);
                }}
                type="button"
                className="btn btn-warning float-left"
              >
                <span className="fas fa-arrow-left" /> Voltar
              </button>
              <button type="submit" className="btn btn-success float-right">
                <span className="fas fa-check" /> Salvar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
