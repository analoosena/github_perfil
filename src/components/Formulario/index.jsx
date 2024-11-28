import { useState, useEffect } from "react"

const Formulario = () => {

    let [materiaA, setMateriaA] = useState(0); //ele nos retorna o valor  e uma função para alterar esse valor
    let [materiaB, setMateriaB] = useState(0);
    let [materiaC, setMateriaC] = useState(0);
    let [nome, setNome] = useState(''); //nome = armazena o valor atual; setNome= é uma função usada para atualizar o valor do estado; '' = valor inicial


    // useEffect(() => {
    //     // Código a ser executado
    //     return () => {
    //       // Código de limpeza (opcional)
    //     };
    //   }, [dependencias]);

    useEffect ( () => {
        console.log("O componente iniciou");

        return ( () => {
            console.log("O componente finalizou")
        })
    },[])

    useEffect ( ()=>{
        console.log("O estado nome mudou")
    },[nome])

    useEffect ( ()=>{
        console.log("A materia A mudou para: " + materiaA)
    },[materiaA])

    const alteraNome= (evento) =>{
        setNome(estadoAnterior => {
            return evento.target.value;
        })
    }

    const renderizaResultado = () =>{
        const soma = materiaA + materiaB + materiaC;
        const media = soma / 3;
        

        if(media>=7){
            return(
                <p>Olá {nome}! Você foi aprovado!</p>
            )
        }else{
            return(
            <p>Olá {nome}, você foi reprovado!</p>)
        }
    }
    return(
        <form>
            {/* onChange recebe uma função que será chamada toda vez que o valor do campo mudar. */}
            <input type="text" placeholder="Seu nome" onChange={alteraNome} /> 
            <input type="number" placeholder="Nota matéria A" onChange={evento => setMateriaA(parseInt(evento.target.value))}/>
            <input type="number" placeholder="Nota matéria B" onChange={evento => setMateriaB(parseInt(evento.target.value))} />
            <input type="number" placeholder="Nota matéria C" onChange={evento => setMateriaC(parseInt(evento.target.value))} />
            <br></br>
            {materiaA} <br></br>
            {materiaB} <br></br>
            {materiaC} <br></br>

            {renderizaResultado()}
        </form>
    )
}

export default Formulario