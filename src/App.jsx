import { useState } from 'react';

import Perfil from './components/Perfil';
import Formulario from './components/Formulario/index.jsx';
import ReposList from './components/ReposList/index.jsx';


function App() {

  const [formularioEstaVisivel, setFormularioEstaVisivel] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState('');

  return(
    <div>
      <input type="text" onBlur={(e) => setNomeUsuario(e.target.value)} />

      {nomeUsuario.length > 4 && (
        <>
          <Perfil nomeUsuario={nomeUsuario}/> 
          <ReposList nomeUsuario={nomeUsuario}/>
        </>
      )}
      {/* Este é um operador lógico "E" que verifica se formularioEstaVisivel é true.
      Se for true, o componente <Formulario /> será renderizado.
      Se for false, o React não renderiza nada no lugar. */}
      {formularioEstaVisivel && (
        <Formulario/>
      )}
      <button onClick={() => setFormularioEstaVisivel(!formularioEstaVisivel)} type='button'>Toggle Form</button>
    </div>
  )
}

export default App
