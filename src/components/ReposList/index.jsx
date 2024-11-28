import { useEffect, useState } from "react";

import styles from './ReposList.module.css';



const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]); //Armazena a lista de repositórios obtida da API do GitHub.  Inicialmente é um array vazio ([]) para evitar erros ao tentar iterar com .map.
    const [estaCarregando, setEstaCarregando] = useState(true); //Gerencia o estado de carregamento. Inicialmente, está como true, indicando que os dados ainda estão sendo buscados. 
    const [erro, setErro] = useState(null); // Armazena mensagens de erro, se existirem.

    useEffect(() => {
        setEstaCarregando(true);
        setErro(null); // Reseta o erro sempre que uma nova requisição é feita.

        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => { //res = resposta da API do GitHub.
                if(!res.ok){ // Verifica se a resposta HTTP foi bem-sucedida
                    throw new Error(`Erro número: ${res.status}`); //Se res.ok for false (ex.: erro 404 ou 500), lança um erro usando throw new Error. Isso faz o controle de fluxo ir diretamente para o bloco .catch.
                }
                return res.json();
            })
            .then(resJson => {
                setTimeout(() => {
                    setEstaCarregando(false); // Interrompe o carregamento
                    setRepos(resJson); // Atualiza o estado com os dados da API
                },3000) // Simula um atraso de 3 segundos
            })
                .catch(err =>{ //e ocorrer algum problema na requisição (ex.: erro de rede ou código HTTP inválido), este bloco é executado
                    setEstaCarregando(false);
                    setErro(err.message); //Salva a mensagem de erro gerada, que pode ser exibida ao usuário.
                });
            
    },[nomeUsuario])
    return(
        <div className="container">
        {estaCarregando && <h1>Carregando ...</h1>}

        {erro && ( // Renderiza a mensagem de erro, se houver.
            <div className={styles.error}>
                <h2>Usuário não encontrado! Erro:</h2>
                <p>{erro}</p>
            </div>
        )}
        {!estaCarregando && !erro && ( //Renderizar a lista de repositórios somente quando estaCarregando for false e não tiver erro
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