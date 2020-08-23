/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
  return (
    <div className="card card-default">
      <div className="card-header">
        <h3 className="card-title">Todos os produtos</h3>

        <Link
          className="btn btn-primary btn-sm float-right"
          to="/products/create"
        >
          <span className="fas fa-plus" /> Novo
        </Link>
      </div>

      <div className="card-body">
        <form>
          <div className="row">
            <div className="col-sm-3 form-group">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                className="form-control"
                v-model="filters.name"
              />
            </div>

            <div className="col-sm-2 form-group">
              <label htmlFor="price-min">Preço mínimo</label>
              <input
                id="price-min"
                step="0.01"
                type="number"
                className="form-control"
                v-model="filters.price_min"
              />
            </div>

            <div className="col-sm-2 form-group">
              <label htmlFor="price-max">Preço máximo</label>
              <input
                id="price-max"
                step="0.01"
                type="number"
                className="form-control"
                v-model="filters.price_max"
              />
            </div>

            <div className="col-sm-2 form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                className="form-control"
                v-model="filters.status_id"
              >
                <option value="">Todos os status</option>
              </select>
            </div>

            <div className="col-sm-2 form-group align-self-end">
              <button type="button" className="btn btn-default btn-block">
                <span className="fas fa-filter" /> Filtrar
              </button>
            </div>

            <div className="col-sm-1 form-group align-self-end">
              <button
                type="button"
                title="Limpar filtros"
                className="btn btn-default btn-block"
              >
                <span className="fas fa-times-circle" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductList;
