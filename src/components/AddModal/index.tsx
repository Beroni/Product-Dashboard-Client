import React, { useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

interface ICreateProductData {
  name: string;
  price: string;
  quantity: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddProduct: any;
}

const ModalAddProduct: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddProduct,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateProductData) => {
      handleAddProduct(data);
      setIsOpen();
    },
    [handleAddProduct, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>New Product</h1>
        <Input name="name" placeholder="Product Name" />

        <Input
          name="price"
          type="number"
          step=".01"
          placeholder="Price - EX : 32.42"
        />
        <Input name="quantity" type="number" placeholder="Quantity - EX: 3" />

        <Button type="submit" data-testid="add-product-button">
          Add Product
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalAddProduct;
