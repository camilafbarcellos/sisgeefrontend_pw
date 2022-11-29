import { useEffect, useState } from "react";

const Alerta = ({ alerta }) => {
    const [exibir, setExibir] = useState(false);

    // executa quando recebe mudança no alerta
    useEffect(() => {
        setExibir(true);
        const id = setTimeout(() => {
            setExibir(false);
        }, 2000); // dorme por 2000ms
        return () => clearTimeout(id);
    }, [alerta]);

    var classe = '';

    if (alerta.status === 'error') {
        classe = 'alert alert-danger'
    } else {
        classe = 'alert alert-primary'
    }

    // caso exista alerta, exibe a mensagem
    return (
        <div>
            {(alerta.message.length > 0 && exibir) &&
                <div className={classe} role="alert">
                    {alerta.message}
                </div>
            }
        </div>
    )
}

export default Alerta;