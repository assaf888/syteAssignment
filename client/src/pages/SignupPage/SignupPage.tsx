import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import { signupUser } from '../../api';
import { PageWrapper, Container } from './SignupPageStyles';

const SignupPage: React.FC = () => {
  const navigate = useNavigate()

  const handleSignup = async (email: string, password: string) => {
    try {
      const { token } = await signupUser(email, password);
      localStorage.setItem('token', token);
      navigate('/login')
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <PageWrapper>
      <Container>
        <AuthForm isLogin={false} onSubmit={handleSignup} />
      </Container>
    </PageWrapper>
  );
};

export default SignupPage;
