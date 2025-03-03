import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api'; // Importa funções para comunicação com a API
import { useNavigate } from 'react-router-dom'; // Importa hook para navegação em rotas

// Cria um contexto para o usuário
export const UserContext = React.createContext();

// Componente que fornece o contexto do usuário
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null); // Estado para armazenar os dados do usuário
  const [login, setLogin] = React.useState(null); // Estado para controlar se o usuário está logado
  const [loading, setLoading] = React.useState(false); // Estado para indicar carregamento
  const [error, setError] = React.useState(null); // Estado para armazenar mensagens de erro
  const navigate = useNavigate(); // Hook para navegação

  // Função para obter os dados do usuário com base no token
  async function getUser(token) {
    const { url, options } = USER_GET(token); // Obtém URL e opções da API para o usuário
    const response = await fetch(url, options); // Faz a requisição à API
    const json = await response.json(); // Converte a resposta para JSON
    setData(json); // Armazena os dados do usuário
    setLogin(true); // Define o estado de login como verdadeiro
  }

  // Função para realizar o logout do usuário
  const userLogout = React.useCallback(async () => {
    setData(null); // Limpa os dados do usuário
    setError(null); // Reseta erros
    setLoading(false); // Reseta estado de loading
    setLogin(false); // Define o estado de login como falso
    window.localStorage.removeItem('token'); // Remove o token do localStorage
  }, []);

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
  
      if (!tokenRes.ok) throw new Error('Error: Usuário inválido');
  
      const { token } = await tokenRes.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      
      navigate('/conta'); // Redireciona para a conta
      return true; // Retorna sucesso
    } catch (err) {
      setError(err.message);
      setLogin(false);
      return false; // Retorna falha
    } finally {
      setLoading(false); // Garante que o loading seja desativado
    }
  }

  // Efeito para realizar auto-login ao carregar o componente
  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token'); // Obtém o token do localStorage
      if (token) {
        try {
          setError(null); // Reseta erros
          setLoading(true); // Inicia o loading
          const { url, options } = TOKEN_VALIDATE_POST(token); // Obtém URL e opções para validação do token
          const response = await fetch(url, options); // Faz a requisição para validar o token
          if (!response.ok) throw new Error('Token inválido'); // Lança erro se a resposta não for OK
          await getUser(token); // Obtém os dados do usuário se o token for válido
        } catch (err) {
          userLogout(); // Realiza logout se houver erro
        } finally {
          setLoading(false); // Finaliza o loading
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin(); // Chama a função de auto-login
  }, [userLogout]); // Dependência para que o efeito seja atualizado se `userLogout` mudar

  // Retorna o contexto do usuário com suas funções e estados
  return (
    <UserContext.Provider value={{ userLogin, userLogout, data, error, loading, login }}>
      {children} {/* Renderiza os filhos do contexto */}
    </UserContext.Provider>
  );
};