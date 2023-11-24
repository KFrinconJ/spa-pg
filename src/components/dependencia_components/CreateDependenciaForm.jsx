
import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { createDependencia } from "../../services/dependencia.service";
import { useAuth0 } from "@auth0/auth0-react";
import ModalAlert from "../ModalAlert";
import ConditionalInput from "../ConditionalInput"

export default function CreateDependenciaForm() {

    const formRef = useRef();
    const { getAccessTokenSilently } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        let createdDependencia = Object.fromEntries(formData.entries());

        // Obtiene token del usuario
        const accessToken = await getAccessTokenSilently();
        // Llamada a la API para actualizar el usuario
        const response = await createDependencia(accessToken, createdDependencia);
        if (response.error) {
            console.error('Error updating depedendencia:', response.error);
            setModalMessage('Hubo un error al actualizar la dependencia')
        } else {
            console.log('Dependencia updated successfully:', response.data);
            setModalMessage('Dependencia creada con éxito')
        }
        setModalOpen(true);

    }

    return (
        <>
            <h2 className='text-2xl font-bold mb-2 text-center'>
                Crear Dependencia
            </h2>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className='w-full max-w-lg mx-auto mt-5 flex flex-col items-center'>
                <div className='container'>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                            {/* Nombre */}
                            <ConditionalInput
                                label={"Nombre"}
                                type={"text"}
                                placeholder={"Ingresa el nombre de la dependencia"}
                                name={"nombre"}></ConditionalInput>
                        </div>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                            {/* Encargado */}
                            <ConditionalInput
                                label={"Encargado"}
                                type={"text"}
                                placeholder={"Ingresa el encargado de la dependencia"}
                                name={"encargado"}>
                            </ConditionalInput>
                        </div>
                    </div>
                </div>
                <ModalAlert
                    isOpen={modalOpen}
                    messageAlert={modalMessage}
                    close={() => setModalOpen(false)}
                    titleModal={"Crear Dependencia"}></ModalAlert>
                <Button color='primary' type='submit'>
                    Guardar
                </Button>
            </form>
        </>
    );
}