import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { UserSignIn } from '../../store/modules/auth/actions';
import { Container, Content, AnimationContainer, Background } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/white-logo.png';
import api from '../../services/api';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  interface SignInCredentials {
    email: string;
    password: string;
  }

  interface SignInResponse {
    user: {
      name: string;
      email: string;
    };
    token: string;
  }

  const handleSignIn = useCallback(
    async (data: SignInCredentials) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email is required')
            .email('Enter a valid email address'),
          password: Yup.string().required('Password is required'),
        });
        await schema.validate(data, { abortEarly: false });

        const { email, password } = data;

        const response = await api.post<SignInResponse>('/sessions', {
          email,
          password,
        });

        const { user, token } = response.data;

        dispatch(
          UserSignIn({
            user: {
              name: user.name,
              email: user.email,
            },
            token,
          }),
        );

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [dispatch, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GettyIO Logo" />

          <Form ref={formRef} onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <Input name="email" icon={FiMail} placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Login</Button>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Create account
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
