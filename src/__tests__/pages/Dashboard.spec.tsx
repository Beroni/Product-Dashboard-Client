import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('react-redux', () => {
  return {
    useDispatch: () => {
      return jest.fn();
    },
    useSelector: () => {
      return { user: { name: 'Joao' } };
    },
  };
});

describe('Dashboard', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to push to Product Dashboard Page', async () => {
    const { getByTestId } = render(<Dashboard />);

    const divElement = getByTestId('product-link');

    fireEvent.click(divElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard-product');
    });
  });

  it('should be able to Logout', async () => {
    const { getByTestId } = render(<Dashboard />);

    const buttonElement = getByTestId('logoff-button');

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });
});
