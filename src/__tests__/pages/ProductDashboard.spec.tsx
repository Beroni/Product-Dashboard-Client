import React from 'react';

import { render, waitFor, act, fireEvent } from '@testing-library/react';

import AxiosMock from 'axios-mock-adapter';
import ProductDashboard from '../../pages/ProductDashboard';
import api from '../../services/api';

const apiMock = new AxiosMock(api);

describe('ProductDashboard', () => {
  it('should be able to list all the products from your api', async () => {
    apiMock.onGet('/products').reply(200, {
      products: [
        {
          _id: 1,
          name: 'Funny Toy',
          price: 19.24,
          quantity: 3,
        },
        {
          _id: 2,
          name: 'Glasses',
          price: 10.24,
          quantity: 1,
        },
        {
          _id: 3,
          name: 'French fries',
          price: 5.0,
          quantity: 100,
        },
      ],
    });

    const { getByText, getByTestId } = render(<ProductDashboard />);

    await waitFor(() => expect(getByText('Funny Toy')).toBeTruthy(), {
      timeout: 200,
    });
    expect(getByTestId('remove-product-1')).toBeTruthy();
    expect(getByTestId('edit-product-1')).toBeTruthy();

    await waitFor(() => expect(getByText('Glasses')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByTestId('remove-product-2')).toBeTruthy();
    expect(getByTestId('edit-product-2')).toBeTruthy();

    await waitFor(() => expect(getByText('French fries')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByTestId('remove-product-3')).toBeTruthy();
    expect(getByTestId('edit-product-3')).toBeTruthy();
  });

  it('should be able to add a new product', async () => {
    apiMock.onGet('/products').reply(200, {
      products: [],
    });

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <ProductDashboard />,
    );

    act(() => {
      fireEvent.click(getByText('ADD PRODUCT'));
    });

    const inputName = getByPlaceholderText('Product Name');
    const inputPrice = getByPlaceholderText('Price - EX : 32.42');
    const inputQuatity = getByPlaceholderText('Quantity - EX: 3');

    await act(async () => {
      fireEvent.change(inputName, {
        target: { value: 'Cool Product' },
      });
      fireEvent.change(inputPrice, { target: { value: 32.46 } });
      fireEvent.change(inputQuatity, { target: { value: 2 } });
    });

    apiMock.onPost('/products').reply(201, {
      _id: 1,
      name: 'Cool Product',
      price: 32.46,
      quantity: 2,
    });

    await act(async () => {
      fireEvent.click(getByTestId('add-product-button'));
    });

    expect(getByTestId('remove-product-1')).toBeTruthy();
    expect(getByTestId('edit-product-1')).toBeTruthy();
  });

  it('should be able to edit a product', async () => {
    apiMock.onGet('/products').reply(200, {
      products: [
        {
          _id: 1,
          name: 'Funny Toy',
          price: 19.24,
          quantity: 3,
        },
        {
          _id: 2,
          name: 'Glasses',
          price: 10.24,
          quantity: 1,
        },
        {
          _id: 3,
          name: 'French fries',
          price: 5.0,
          quantity: 100,
        },
      ],
    });

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <ProductDashboard />,
    );

    await waitFor(() => expect(getByText('Funny Toy')).toBeTruthy(), {
      timeout: 200,
    });

    apiMock.onGet('/products').reply(200, {
      products: [
        {
          _id: 1,
          name: 'Funny Toy',
          price: 19.24,
          quantity: 3,
        },
      ],
    });

    await waitFor(() => expect(getByText('Funny Toy')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByTestId('remove-product-1')).toBeTruthy();
    expect(getByTestId('edit-product-1')).toBeTruthy();

    act(() => {
      fireEvent.click(getByTestId('edit-product-1'));
    });

    const inputName = getByPlaceholderText('Product Name');
    const inputPrice = getByPlaceholderText('Price - EX : 32.42');
    const inputQuatity = getByPlaceholderText('Quantity - EX: 3');

    await act(async () => {
      fireEvent.change(inputName, { target: { value: 'New Funny Toy' } });
      fireEvent.change(inputPrice, { target: { value: 32.45 } });
      fireEvent.change(inputQuatity, {
        target: {
          value: 4,
        },
      });
    });

    expect(inputName.value).toBe('New Funny Toy');
    expect(inputPrice.value).toBe('32.45');
    expect(inputQuatity.value).toBe('4');

    apiMock.onPut('/products/1').reply(200, {
      _id: 1,
      name: 'Funny Toy',
      price: 32.45,
      quantity: 4,
    });

    await act(async () => {
      fireEvent.click(getByTestId('edit-product-button'));
    });

    await waitFor(() => expect(getByText('New Funny Toy')).toBeTruthy(), {
      timeout: 200,
    });
  });

  it('should be able to delete a product', async () => {
    apiMock.onGet('/products').reply(200, {
      products: [
        {
          _id: 1,
          name: 'Funny Toy',
          price: 19.24,
          quantity: 3,
        },
      ],
    });

    apiMock.onDelete('products/1').reply(204);

    const { getByText, getByTestId } = render(<ProductDashboard />);

    await waitFor(() => expect(getByText('Funny Toy')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByTestId('remove-product-1')).toBeTruthy();
    expect(getByTestId('edit-product-1')).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId('remove-product-1'));
    });

    expect(getByTestId('products-list')).toBeEmptyDOMElement();
  });
});
