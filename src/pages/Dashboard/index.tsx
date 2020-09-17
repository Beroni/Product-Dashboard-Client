import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { IState } from '../../store';
import { IAuthState } from '../../store/modules/auth/types';
import { UserSignOut } from '../../store/modules/auth/actions';

import {
  Container,
  Header,
  HeaderContent,
  HeaderProfile,
  Content,
  Administration,
  Section,
} from './styles';
import ImageAvatar from '../../assets/avatar.png';

import logoImg from '../../assets/white-logo.png';

const Dashboard: React.FC = () => {
  const state = useSelector<IState, IAuthState>(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const SignOff = useCallback(() => {
    dispatch(UserSignOut());

    history.push('/');
  }, [history, dispatch]);

  const handleModelClick = useCallback(
    (modelType: string) => {
      history.push(`/dashboard-${modelType}`);
    },
    [history],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GettyIO Logo" />

          <HeaderProfile>
            <img src={ImageAvatar} alt="User avatar" />

            <div>
              <span>Welcome,</span>
              <strong>{state.user.name || 'John Doe'}</strong>
            </div>
          </HeaderProfile>

          <button type="button" onClick={SignOff} data-testid="logoff-button">
            <FiPower size={20} />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Administration>
          <Section>
            <strong>Models</strong>

            <div
              onClick={() => handleModelClick('product')}
              data-testid="product-link"
            >
              <strong>Product</strong>
            </div>
          </Section>
        </Administration>
      </Content>
    </Container>
  );
};

export default Dashboard;
