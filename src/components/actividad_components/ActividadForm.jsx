
import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { updateActividad } from "../../services/actividad.service";
import { useAuth0 } from "@auth0/auth0-react";
import ModalAlert from "../ModalAlert";
import ConditionalInput from "../ConditionalInput"

export default function ActividadForm({ dataIn }) {

    const formRef = useRef();
    const { getAccessTokenSilently } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        let updatedActividad = Object.fromEntries(formData.entries());

        // Obtiene token del usuario
        const accessToken = await getAccessTokenSilently();
        updatedActividad.cantidad_horas = parseInt(updatedActividad.cantidad_horas, 10)
        // Llamada a la API para actualizar el usuario
        const response = await updateActividad(accessToken, dataIn.id, updatedActividad);
        if (response.error) {
            console.error('Error updating user:', response.error);
            setModalMessage('Hubo un error al actualizar la actividad')
        } else {
            console.log('Actividad updated successfully:', response.data);
            setModalMessage('Actividad actualizada con éxito')
        }
        setModalOpen(true);

    }

    return (
        <>
            <h2 className='text-2xl font-bold mb-2 text-center'>
                Detalles de la actividad:
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
                                dataIn={dataIn}
                                label={"Nombre"}
                                dbData={dataIn.nombre}
                                type={"text"}
                                placeholder={"Ingresa el nombre del curso"}
                                name={"nombre"}></ConditionalInput>
                        </div>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                            {/* Apellido */}
                            <ConditionalInput
                                dataIn={dataIn}
                                label={"Horas"}
                                dbData={dataIn.cantidad_horas}
                                type={"number"}
                                placeholder={"Ingresa la cantidad de horas semanales de la actividad"}
                                name={"cantidad_horas"}
                                inputMode='numeric'>
                            </ConditionalInput>
                        </div>
                    </div>

                </div>
                <ModalAlert
                    isOpen={modalOpen}
                    messageAlert={modalMessage}
                    close={() => setModalOpen(false)}
                    titleModal={"Actualizar Usuario"}></ModalAlert>
                <Button color='primary' type='submit'>
                    Actualizar
                </Button>
            </form>
        </>
    );
}