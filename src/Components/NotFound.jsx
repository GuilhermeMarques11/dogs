import React from 'react'
import Head from './Helper/Head'

const NotFound = () => {
  return (
    <div className='container mainContainer'>
      <Head title='404' />
      <h1 className='title'>Erro: 404</h1>
      <p>Página não encontrada</p>
    </div>
  )
}

export default NotFound