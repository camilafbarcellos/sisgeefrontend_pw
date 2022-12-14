import { useState, useEffect } from "react";
import PredioContext from "./PredioContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Predio() {
    // alerta inicializado em branco
    const [alerta, setAlerta] = useState({ status: "", message: "" })
    // lista de objetos a exibir na tela inicializada vazia
    const [listaObjetos, setListaObjetos] = useState([]);
    // controle sobre edição ou adição
    const [editar, setEditar] = useState(false);
    // objeto do predio
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        descricao: "", sigla: ""
    });

    // recuperar registro
    const recuperar = async codigo => {
        // endereço da API
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log('Erro: ' + err))
    }

    // recuperar registro
    const acaoCadastrar = async e => {
        // ignora ação padrão do botão
        e.preventDefault();
        // determinar método pelo estado de 'editar'
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios`,
            {
                method : metodo,
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(objeto)
            })
            .then(response => response.json())
            .then(json => {
                setAlerta({status : json.status, message : json.message});
                setObjeto(json.objeto);
                // caso não esteja em edição
                if(!editar) {
                    setEditar(true);
                }
            })
        } catch(err) {
            console.log(err.message);
        }
        recuperaPredios();
    }

    // tratamento de mudanças
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    // consultar registros
    const recuperaPredios = async () => {
        // endereço da API
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    // remover registro
    const remover = async objeto => {
        // janela de confirmação
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaPredios();
            } catch (err) {
                console.log('Erro: ' + err);
            }
        }
    }

    // recupera registros a cada mudança
    useEffect(() => {
        recuperaPredios();
    }, []);

    return (
        <PredioContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaPredios,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange
            }
        }>
            <Tabela />
            <Form />
        </PredioContext.Provider>
    );
}

export default Predio;