
import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { updateGrupo } from "../../services/grupo.service";
import { useAuth0 } from "@auth0/auth0-react";
import ModalAlert from "../ModalAlert";
import ConditionalInput from "../ConditionalInput"

export default function GrupoForm({ dataIn }) {

    const formRef = useRef();
    const { getAccessTokenSilently } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        let updatedGrupo = Object.fromEntries(formData.entries());

        // Obtiene token del usuario
        const accessToken = await getAccessTokenSilently();
        // Llamada a la API para actualizar el usuario
        const response = await updateGrupo(accessToken, dataIn.id, updatedGrupo);
        if (response.error) {
            console.error('Error updating user:', response.error);
            setModalMessage('Hubo un error al actualizar el usuario')
        } else {
            console.log('User updated successfully:', response.data);
            setModalMessage('Usuario actualizado con éxito')
        }
        setModalOpen(true);

    }

    return (
        <>
            <h2 className='text-2xl font-bold mb-2 text-center'>
                Detalles del Grupo:
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
                                dataIn={dataIn}
                                label={"Nombre"}
                                dbData={dataIn.nombre}
                                type={"text"}
                                placeholder={"Ingresa el nombre del grupo"}
                                name={"nombre"}>
                            </ConditionalInput>
                        </div>
                    </div>
                </div>
                <ModalAlert
                    isOpen={modalOpen}
                    messageAlert={modalMessage}
                    close={() => setModalOpen(false)}
                    titleModal={"Actualizar Grupo"}></ModalAlert>
                <Button color='primary' type='submit'>
                    Actualizar
                </Button>
            </form>
        </>
    );
}