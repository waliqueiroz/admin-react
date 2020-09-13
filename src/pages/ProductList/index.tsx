/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

import Swal from 'sweetalert2';
import api from '../../services/api';
import ProductCard, { Product } from '../../components/ProductCard';
import { showSuccessMessage, showErrorMessages } from '../../util/helpers';

export interface Status {
  id: number;
  name: string;
}

export interface Products {
  current_page: number;
  data: Array<Product>;
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

const ProductList: React.FC = () => {
  const [statuses, setStatuses] = useState([]);
  const [products, setProducts] = useState<Products | undefined>();
  const [status_id, setStatusId] = useState('');
  const [name, setName] = useState('');
  const [price_min, setPriceMin] = useState('');
  const [price_max, setPriceMax] = useState('');

  async function getStatuses() {
    const response = await api.get('/statuses');
    setStatuses(response.data);
  }

  async function getProducts(filters = {}) {
    const response = await api.get('/products', { params: filters });
    setProducts(response.data);
  }

  function handleFilterProducts(page = 1) {
    const filters = {
      status_id,
      price_min,
      price_max,
      name,
      page,
      paginate: true,
    };

    getProducts(filters);
  }

  function cleanFilters() {
    setStatusId('');
    setName('');
    setPriceMin('');
    setPriceMax('');
    getProducts({ paginate: true });
  }

  function destroy(product: Product) {
    Swal.fire({
      title: `Excluir o produto "${product.name}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="fas fa-check"></i> Confirmar',
      cancelButtonText: '<i class="fas fa-times"></i> Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        try {
          await api.delete(`/products/${product.id}`);
          showSuccessMessage(`${product.name} excluído com sucesso!`);
          getProducts({ paginate: true });
        } catch (error) {
          showErrorMessages(error);
        }
      }
    });
  }

  useEffect(() => {
    getStatuses();
    getProducts({ paginate: true });
  }, []);

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFilterProducts();
          }}
        >
          <div className="row">
            <div className="col-sm-3 form-group">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="col-sm-2 form-group">
              <label htmlFor="price-min">Preço mínimo</label>
              <input
                id="price-min"
                step="0.01"
                type="number"
                className="form-control"
                value={price_min}
                onChange={(e) => {
                  setPriceMin(e.target.value);
                }}
              />
            </div>

            <div className="col-sm-2 form-group">
              <label htmlFor="price-max">Preço máximo</label>
              <input
                id="price-max"
                step="0.01"
                type="number"
                className="form-control"
                value={price_max}
                onChange={(e) => {
                  setPriceMax(e.target.value);
                }}
              />
            </div>

            <div className="col-sm-2 form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                className="form-control"
                value={status_id}
                onChange={(e) => {
                  setStatusId(e.target.value);
                }}
              >
                <option value="">Todos os status</option>
                {statuses.map((status: Status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
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
        <div className="row">
          {products?.data.map((product) => (
            <div
              key={product.id}
              className="col-sm-2 d-flex align-items-stretch"
            >
              <ProductCard product={product}>
                <Link
                  to={`/products/${product.id}/edit`}
                  className="btn btn-sm btn-info btn-block"
                >
                  <span className="far fa-edit" /> Editar
                </Link>
                <button
                  onClick={() => destroy(product)}
                  type="button"
                  className="btn btn-sm btn-danger btn-block"
                >
                  <span className="fas fa-trash" /> Excluir
                </button>
              </ProductCard>
            </div>
          ))}
        </div>
        <div className="row align-items-center">
          <div className="col-sm-5">
            Mostrando {products?.from} até {products?.to} de {products?.total}{' '}
            produtos encontrados.
          </div>
          <div className="col-sm-7 ml-auto">
            <div className="float-right">
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={products?.current_page ?? 1}
                itemsCountPerPage={products?.per_page}
                totalItemsCount={products?.total ?? 0}
                pageRangeDisplayed={5}
                onChange={handleFilterProducts}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
