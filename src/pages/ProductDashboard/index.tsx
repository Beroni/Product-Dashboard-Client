import React, { useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import { FiArrowLeft, FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Content,
  ContentHeader,
  ProductList,
  ProductItem,
  ProductInfo,
  ProductButtons,
} from './styles';

import Button from '../../components/Button';

import AddModal from '../../components/AddModal';
import EditModal from '../../components/EditModal';

import logoImg from '../../assets/white-logo.png';

import api from '../../services/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Products {
  products: Product[];
}

const ProductDashboard: React.FC = () => {
  const history = useHistory();

  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product>({} as Product);

  useEffect(() => {
    async function loadData(): Promise<void> {
      const response = await api.get<Products>('/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@GettyIO/TOKEN')}`,
        },
      });
      setProducts(response.data.products);
    }
    loadData();
  }, []);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [setModalOpen, modalOpen]);

  const toggleEditModal = useCallback(() => {
    setEditModalOpen(!editModalOpen);
  }, [setEditModalOpen, editModalOpen]);

  const handleAddProduct = useCallback(
    async (product: Product) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required(),
          price: Yup.string().required(),
          quantity: Yup.string().required(),
        });

        await schema.validate(product, { abortEarly: false });

        const { name, quantity, price } = product;

        const response = await api.post<Product>(
          '/products',
          {
            name,
            quantity: Number(quantity),
            price: Number(price),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('@GettyIO/TOKEN')}`,
            },
          },
        );

        const newProduct = response.data;

        setProducts([newProduct, ...products]);
      } catch (err) {
        console.log(err);
      }
    },
    [setProducts, products],
  );

  const handleRemoveProduct = useCallback(
    async (id: string) => {
      await api.delete(`products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@GettyIO/TOKEN')}`,
        },
      });

      const filteredProducts = products.filter(product => product._id !== id);

      setProducts([...filteredProducts]);
    },
    [setProducts, products],
  );

  const handleEditProduct = async (product: Product): Promise<void> => {
    const currentProductList = products.map(currentProduct => {
      if (currentProduct._id !== product._id) {
        return currentProduct;
      }

      return {
        ...product,
        _id: product._id,
      };
    });

    setProducts(currentProductList);

    await api.put(
      `/products/${product._id}`,
      {
        name: product.name,
        quantity: Number(product.quantity),
        price: Number(product.price),
        _id: product._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@GettyIO/TOKEN')}`,
        },
      },
    );
  };

  const handleUpdateProduct = useCallback(
    (product: Product) => {
      setEditingProduct(product);
      toggleEditModal();
    },
    [setEditingProduct, toggleEditModal],
  );

  return (
    <>
      <AddModal
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddProduct={handleAddProduct}
      />
      <EditModal
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        handleEditProduct={handleEditProduct}
        editingProduct={editingProduct}
      />
      <Container>
        <Header>
          <HeaderContent>
            <img src={logoImg} alt="Logo Getty/IO" />

            <button type="button" onClick={() => history.push('/dashboard')}>
              <FiArrowLeft size={20} />
            </button>
          </HeaderContent>
        </Header>
        <Content>
          <ContentHeader>
            <strong>Select product to change</strong>

            <Button onClick={() => toggleModal()}>
              ADD PRODUCT
              <FiPlus />
            </Button>
          </ContentHeader>
          <ProductList data-testid="products-list">
            {products &&
              products.map(product => (
                <ProductItem key={product._id}>
                  <ProductInfo>
                    <strong>{product.name}</strong>
                    <h5>Price: ${product.price}</h5>
                    <p>
                      Quantity:
                      {product.quantity}
                    </p>
                  </ProductInfo>
                  <ProductButtons>
                    <button
                      type="button"
                      onClick={() => handleUpdateProduct(product)}
                      data-testid={`edit-product-${product._id}`}
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(product._id)}
                      data-testid={`remove-product-${product._id}`}
                    >
                      <FiTrash size={16} />
                    </button>
                  </ProductButtons>
                </ProductItem>
              ))}
          </ProductList>
        </Content>
      </Container>
    </>
  );
};

export default ProductDashboard;
