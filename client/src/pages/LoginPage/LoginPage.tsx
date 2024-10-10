import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import { loginUser } from '../../api';

import { PageWrapper, Container } from './LoginPageStyles';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', email)
      onLogin();
      navigate('/catalogs');
    } catch (error) {
      console.error('Login failed', error);
      setError('Incorrect email or password. Please try again.');
    }
  };

  return (
    <PageWrapper>
      <Container>
        <AuthForm isLogin={true} onSubmit={handleLogin} />
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </Container>
    </PageWrapper>
  );
};

export default LoginPage;
