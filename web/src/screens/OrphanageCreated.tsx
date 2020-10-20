import React from 'react';
import { useHistory } from 'react-router-dom';

import ImageIcon from '../images/check.svg';

import '../styles/pages/orphanage-created.css';

export default function OrphanageCreated() {
  const history = useHistory();

  function goToLandingPage() {
    history.push('/app');
  }

  return (
    <div id="check-orphanage">
      <div className="text">
        <h1>Ebaaa!</h1>
        <p>
        O cadastro deu certo e foi enviado <br/>
        ao administrador para ser aprovado. <br/>
        Agora é só esperar :)
        </p>
        <button
          onClick={goToLandingPage}
          type='button'
        >
          Voltar para o mapa
        </button>
      </div>
      <div className="icon">
        <img src={ImageIcon} alt="Happy"/>
      </div>
    </div>
  )
}