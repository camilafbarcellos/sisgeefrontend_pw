import { useState, useEffect } from "react";
import SalaContext from "./SalaContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Sala() {
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
    // lista de prédios para seleção
    const [listaPredios, setListaPredios] = useState([]);

    // recuperar registro
    const recuperar = async codigo => {
        // endereço da API
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas/${codigo}`)
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
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas`,
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
        recuperaSalas();
    }

    // tratamento de mudanças
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    // consultar registros
    const recuperaSalas = async () => {
        // endereço da API
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    // consultar registros de predios
    const recuperaPredios = async () => {
        // endereço da API
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios`)
            .then(response => response.json())
            .then(data => setListaPredios(data))
            .catch(err => console.log('Erro: ' + err))
    }

    // remover registro
    const remover = async objeto => {
        // janela de confirmação
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaSalas();
            } catch (err) {
                console.log('Erro: ' + err);
            }
        }
    }

    // recupera registros a cada mudança
    useEffect(() => {
        recuperaSalas();
        recuperaPredios();
    }, []);

    return (
        <SalaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaSalas, recuperaPredios,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange,
                listaPredios
            }
        }>
            <Tabela />
            <Form />
        </SalaContext.Provider>
    );
}

export default Sala;