import React, { useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

interface IEditProductData {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingProduct: IEditProductData;
  handleEditProduct: any;
}

const ModalEditProduct: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingProduct,
  handleEditProduct,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditProductData) => {
      handleEditProduct({ ...data, _id: editingProduct._id });
      setIsOpen();
    },
    [handleEditProduct, setIsOpen, editingProduct._id],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingProduct}>
        <h1>Edit Product</h1>
        <Input name="name" placeholder="Product Name" />

        <Input
          name="price"
          type="number"
          step=".01"
          placeholder="Price - EX : 32.42"
        />
        <Input name="quantity" type="number" placeholder="Quantity - EX: 3" />

        <Button type="submit" data-testid="edit-product-button">
          Edit Product
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalEditProduct;
