import { useContext } from 'react'
import Alerta from '../../Alerta';
import SalaContext from './SalaContext';

function Form() {
    // extrai do contexto do PredioContext
    const { objeto, handleChange, acaoCadastrar, alerta, listaPredios } = useContext(SalaContext);

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Prédio</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtCodido" className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodido"
                                    name="codigo"
                                    value={objeto.codigo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtNumero" className="form-label">
                                    Número
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtNumero"
                                    name="numero"
                                    value={objeto.numero}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Número OK!
                                </div>
                                <div className="invalid-feedback">
                                    Numero deve ser informado!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtDescricao" className="form-label">
                                    Descrição
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtSite"
                                    name="descricao"
                                    value={objeto.descricao}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Descrição OK!
                                </div>
                                <div className="invalid-feedback">
                                    Descrição deve ser informada!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtCapacidade" className="form-label">
                                    Capacidade
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtCapacidade"
                                    name="capacidade"
                                    value={objeto.capacidade}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Capacidade OK!
                                </div>
                                <div className="invalid-feedback">
                                    Capacidade deve ser informada!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="selectPredio" className="form-label">
                                    Prédio
                                </label>
                                <select
                                    required
                                    className="form-control"
                                    id="selectPredio"
                                    value={objeto.predio}
                                    name="predio"
                                    onChange={handleChange}>
                                    <option disable="true" value="">(Selecione o prédio)</option>
                                    {listaPredios.map((predio) => (
                                        <option key={predio.codigo} value={predio.codigo}>
                                            {predio.nome}
                                        </option>
                                    ))}
                                </select>
                                <div className="valid-feedback">
                                    Prédio OK!
                                </div>
                                <div class="invalid-feedback">
                                    Selecione um prédio...
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" >
                                Salvar  <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;