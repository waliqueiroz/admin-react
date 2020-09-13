/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { User, Role } from '../../store/modules/auth/types';
import { roles } from '../../util/constants';

export interface Users {
  current_page: number;
  data: Array<User>;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: number | null;
  path: string;
  per_page: number;
  prev_page_url: number | null;
  to: number;
  total: number;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<Users | undefined>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  async function getUsers(filters = {}) {
    const response = await api.get('/users', { params: filters });
    setUsers(response.data);
  }

  function handleFilterUsers(page = 1) {
    const filters = {
      email,
      role,
      name,
      page,
      paginate: true,
    };

    getUsers(filters);
  }

  function cleanFilters() {
    setName('');
    setEmail('');
    setRole('');
    getUsers({ paginate: true });
  }

  useEffect(() => {
    getUsers({ paginate: true });
  }, []);

  return (
    <div className="card card-default">
      <div className="card-header">
        <h3 className="card-title">Todos os usuários</h3>
        <Link className="btn btn-primary btn-sm float-right" to="/users/create">
          <span className="fas fa-plus" /> Novo
        </Link>
      </div>
      <div className="card-body">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFilterUsers();
          }}
        >
          <div className="row">
            <div className="col-sm-4 form-group">
              <label htmlFor="name">Nome</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                id="name"
                type="text"
                className="form-control"
                v-model="filters.name"
              />
            </div>

            <div className="col-sm-3 form-group">
              <label htmlFor="email">E-mail</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="text"
                className="form-control"
                v-model="filters.email"
              />
            </div>

            <div className="form-group col-sm-2">
              <label htmlFor="role">Nível</label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                id="role"
                className="form-control"
              >
                <option value="">Todos os níveis</option>
                {roles.map((curretRole: string) => {
                  return (
                    <option key={curretRole} value={curretRole}>
                      {curretRole}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-sm-2 form-group align-self-end">
              <button type="submit" className="btn btn-default btn-block">
                <span className="fas fa-filter" /> Filtrar
              </button>
            </div>

            <div className="col-sm-1 form-group align-self-end">
              <button
                onClick={cleanFilters}
                type="button"
                title="Limpar filtros"
                className="btn btn-default btn-block"
              >
                <span className="fas fa-times-circle" />
              </button>
            </div>
          </div>
        </form>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Nível</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {users?.data.map((user: User) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{(user?.roles[0] as Role).name}</td>
                <td width="5%">
                  <div className="btn-group btn-group-sm">
                    <Link
                      title="Editar"
                      to={`/users/${user.id}/edit/`}
                      className="btn btn-info"
                    >
                      <i className="fas fa-edit" />
                    </Link>

                    <button
                      type="button"
                      title="Excluir"
                      className="btn btn-danger"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          {/* <div className="col-sm-5">Mostrando {{ users.from }} até {{ users.to }} de {{ users.total }} usuários encontrados.</div>
                <div className="col-sm-7">
                    <laravue-pagination align="right" limit="5" data="users" v-on:pagination-change-page="getUsers">
                        <span slot="prev-nav">&lt; Anterior</span>
                        <span slot="next-nav">Próximo &gt;</span>
                    </laravue-pagination>
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserList;
