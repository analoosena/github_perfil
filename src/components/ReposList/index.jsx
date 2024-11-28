import { useEffect, useState } from "react";

import styles from './ReposList.module.css';



const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]); //Armazena a lista de repositórios obtida da API do GitHub.  Inicialmente é um array vazio ([]) para evitar erros ao tentar iterar com .map.
    const [estaCarregando, setEstaCarregando] = useState(true); //Gerencia o estado de carregamento. Inicialmente, está como true, indicando que os dados ainda estão sendo buscados. 

    useEffect(() => {
        setEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then(res => res.json()) //Atualizar o estado repos com os dados da API (resJson).
        .then(resJson => {
            setTimeout(() => {
                setEstaCarregando(false); // Interrompe o carregamento
                setRepos(resJson); // Atualiza o estado com os dados da API
            },3000) // Simula um atraso de 3 segundos

        })
    },[nomeUsuario])
    return(
        <div className="container">
        {estaCarregando ? (  // Quando estaCarregando é true: Renderiza a mensagem.
            <h1>Carregando ...</h1> //Quando estaCarregando é false, não renderiza o <h1>; a lista de repositórios é exibida no lugar.
        ):(
            <ul className={styles.list}>
                {repos.map(repositorio => ( //Itera sobre o array repos e cria um <li> para cada repositório.
                    <li className={styles.listItem} key={repositorio.id}> {/* A chave única key={repositorio.id} ajuda o React a otimizar a renderização. */}
                        <div className={styles.itemName}><b >Nome: </b>{repositorio.name}<br /></div>
                        <div className={styles.itemLanguage}><b >Linguagem: </b>{repositorio.language}<br /></div>
                        <a className={styles.itemLink} href={styles.itemLink} target="_blank" > Visitar no GitHub</a>
                    </li>
                ))}
            </ul>
        )}
        </div>
        
    )
}

export default ReposList;