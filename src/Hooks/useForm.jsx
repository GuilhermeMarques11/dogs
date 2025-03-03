import React from 'react';

// Define tipos de validação com expressões regulares e mensagens de erro correspondentes
const types = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um e-mail válido', // Mensagem de erro se o e-mail não for válido
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message: 'A senha precisa ter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e no mínimo 8 caracteres'
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize números apenas.'
  }
};

// Hook personalizado para gerenciar formulários
const useForm = (type) => {
  const [value, setValue] = React.useState(''); // Estado para armazenar o valor do campo
  const [error, setError] = React.useState(null); // Estado para armazenar mensagens de erro

  // Função para validar o valor do campo
  function validate(value) {
    if (!type) return true; // Se não houver tipo definido, a validação é bem-sucedida
    if (value.length === 0) {
      setError('Preencha um valor.'); // Mensagem de erro se o campo estiver vazio
      return false; // Validação falha
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message); // Mensagem de erro se o valor não corresponder ao regex
      return false; // Validação falha
    } else {
      setError(null); // Limpa o erro se a validação passar
      return true; // Validação bem-sucedida
    }
  }

  // Função chamada quando o valor do campo muda
  function onChange({ target }) {
    if (error) validate(target.value); // Valida o novo valor se houver um erro
    setValue(target.value); // Atualiza o valor do campo
  }

  // Retorna um objeto com propriedades e funções para uso no campo de formulário
  return {
    value, // Valor atual do campo
    setValue, // Função para definir o valor do campo
    onChange, // Função para lidar com mudanças no campo
    error, // Mensagem de erro atual
    validate: () => validate(value), // Função para validar o valor atual
    onBlur: () => validate(value), // Função para validar ao sair do campo
  };
};

export default useForm; // Exporta o hook para uso em outros componentes