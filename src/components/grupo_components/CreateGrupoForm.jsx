
import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { createGrupo } from "../../services/grupo.service";
import { useAuth0 } from "@auth0/auth0-react";
import ModalAlert from "../ModalAlert";
import ConditionalInput from "../ConditionalInput"

export default function CreateGrupoForm() {

    const formRef = useRef();
    const { getAccessTokenSilently } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        let createdGrupo = Object.fromEntries(formData.entries());

        // Obtiene token del usuario
        const accessToken = await getAccessTokenSilently();
        // Llamada a la API para actualizar el usuario
        const response = await createGrupo(accessToken, createdGrupo);
        if (response.error) {
            console.error('Error updating grupo:', response.error);
            setModalMessage('Hubo un error al actualizar el grupo')
        } else {
            console.log('Grupo updated successfully:', response.data);
            setModalMessage('Grupo creado con éxito')
        }
        setModalOpen(true);

    }

    return (
        <>
            <h2 className='text-2xl font-bold mb-2 text-center'>
                Crear Grupo
            </h2>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className='w-full max-w-lg mx-auto mt-5 flex flex-col items-center'>
                <div className='container'>

                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                              {/* Nombre */}
                              <ConditionalInput
                                label={"Nombre"}
                                type={"text"}
                                placeholder={"Ingresa el nombre del grupo"}
                                name={"nombre"}></ConditionalInput>
                        </div>
                    </div>
                </div>
                <ModalAlert
                    isOpen={modalOpen}
                    messageAlert={modalMessage}
                    close={() => setModalOpen(false)}
                    titleModal={"Crear Grupo"}></ModalAlert>
                <Button color='primary' type='submit'>
                    Guardar
                </Button>
            </form>
        </>
    );
}