import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import history from '../../services/history';
import { showSuccessMessage, showErrorMessages } from '../../util/helpers';
import api from '../../services/api';

const ProductForm: React.FC = () => {
  const [cardTitle, setCardTitle] = useState('Cadastrar produto');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | string>('');
  const { id: productId } = useParams();

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImage(e.target.files[0]);
  }

  async function store(data: FormData) {
    try {
      await api.post('/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      showSuccessMessage(`Produto cadastrado com sucesso!`);
      history.push('/products');
    } catch (error) {
      showErrorMessages(error);
    }
  }

  async function update(data: FormData) {
    try {
      data.append('_method', 'PUT');

      await api.post(`/products/${productId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      showSuccessMessage(`Produto atualizado com sucesso!`);
      history.push('/products');
    } catch (error) {
      showErrorMessages(error);
    }
  }

  function save(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    if (productId) {
      update(formData);
    } else {
      store(formData);
    }
  }

  async function getProduct(id: number) {
    const response = await api.get(`/products/${id}`);
    setName(response.data.name);
    setPrice(response.data.price);
  }

  useEffect(() => {
    if (productId) {
      setCardTitle('Editar produto');
      getProduct(productId);
    }
  }, [productId]);

  return (
    <div className="card card-default">
      <div className="card-header">
        <h3 className="card-title">{cardTitle}</h3>
      </div>
      <form onSubmit={save}>
        <div className="card-body">
          <div className="row">
            <div className="form-group col-sm-6">
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
            <div className="form-group col-sm-6">
              <label htmlFor="price">Preço (R$)</label>
              <input
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                id="price"
                required
                type="number"
                step="0.01"
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-12">
              <label htmlFor="image">Imagem</label>
              <input
                required={!productId}
                onChange={handleImageChange}
                id="image"
                accept="image/*"
                type="file"
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

export default ProductForm;
