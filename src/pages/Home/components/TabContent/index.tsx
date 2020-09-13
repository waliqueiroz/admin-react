/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import Swal from 'sweetalert2';
import ProductCard, { Product } from '../../../../components/ProductCard';
import { Products } from '../../../ProductList';
import api from '../../../../services/api';
import { status } from '../../../../util/constants';
import {
  hasPermission,
  showErrorMessages,
  showSuccessMessage,
} from '../../../../util/helpers';

export interface TapContentProps {
  statusId: number;
}

const TabContent: React.FC<TapContentProps> = ({ statusId }) => {
  const [products, setProducts] = useState<Products | undefined>();

  async function getProducts(filters = {}) {
    const response = await api.get('/products', { params: filters });
    setProducts(response.data);
  }

  function handleFilterProducts(page = 1) {
    const filters = {
      status_id: statusId,
      page,
      paginate: true,
    };

    getProducts(filters);
  }

  useEffect(() => {
    getProducts({ status_id: statusId, paginate: true });
  }, [statusId]);

  async function updateStatus(
    product: Product,
    currentStatusId: number,
    title: string,
  ) {
    Swal.fire({
      title,
      text: 'Esta ação não poderá ser desfeita.',
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
          await api.put(`products/${product.id}/update-status`, {
            status_id: currentStatusId,
          });
          showSuccessMessage(`Operação realizada com sucesso!`);
          window.location.reload();
        } catch (error) {
          showErrorMessages(error);
        }
      }
    });
  }

  return (
    <section>
      <div className="row">
        {products?.data.map((product: Product) => (
          <div key={product.id} className="col-sm-2 d-flex align-items-stretch">
            <ProductCard product={product}>
              {statusId === status.PENDING &&
                hasPermission('product.sendToReview') && (
                  <button
                    onClick={() => {
                      updateStatus(
                        product,
                        status.UNDER_ANALYSIS,
                        `Enviar '${product.name}' para análise?`,
                      );
                    }}
                    type="button"
                    className="btn btn-sm btn-primary btn-block"
                  >
                    <span className="fas fa-arrow-right" /> Enviar para análise
                  </button>
                )}

              {statusId === status.UNDER_ANALYSIS &&
                hasPermission('product.approveOrDisapprove') && (
                  <div>
                    <button
                      onClick={() => {
                        updateStatus(
                          product,
                          status.APPROVED,
                          `Aprovar '${product.name}'?`,
                        );
                      }}
                      type="button"
                      className="btn btn-sm btn-success btn-block"
                    >
                      <span className="fas fa-check" /> Aprovar
                    </button>

                    <button
                      onClick={() => {
                        updateStatus(
                          product,
                          status.DISAPPROVED,
                          `Reprovar '${product.name}'?`,
                        );
                      }}
                      type="button"
                      className="btn btn-sm btn-danger btn-block"
                    >
                      <span className="fas fa-times" /> Reprovar
                    </button>
                  </div>
                )}
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
    </section>
  );
};

export default TabContent;
