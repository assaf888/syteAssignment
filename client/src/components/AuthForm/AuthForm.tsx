import React, { useState } from 'react';
import { Form, Title, Input, Button } from './AuthFormStyles';

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>{isLogin ? 'Login' : 'Sign Up'}</Title>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
    </Form>
  );
};

export default AuthForm;
