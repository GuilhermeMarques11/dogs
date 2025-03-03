import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../api';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handlSubmit(event) {
    event.preventDefault();
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.origin + '/login/resetar',
      });
      const { json } = await request(url, options);
      console.log(json);
    }
  }

  return (
    <section className='animeLeft'>
      <Head title='Redefinição de senha' />
      <h1 className="title">Redefinir senha</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>{data}</p>
      ) : (
        <form onSubmit={handlSubmit}>
          <Input
            placeholder="Digite seu nome de usuário u e-mail"
            type="text"
            name="login"
            {...login}
          />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Redefinir senha</Button>
          )}
        </form>
      )}
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
