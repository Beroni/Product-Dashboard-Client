import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import logoImg from '../../assets/white-logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';
import api from '../../services/api';

const SignUp: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async data => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .email('Enter a valid email address')
            .required('Email is required'),
          password: Yup.string().min(6, 'Password need at least 6 digits'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', {
          ...data,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GettyIO Logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <Input name="name" icon={FiUser} placeholder="Name" />
            <Input name="email" icon={FiMail} placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Sign up</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Back to the login page
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
