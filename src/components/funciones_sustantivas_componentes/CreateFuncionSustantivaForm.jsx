
import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { createFuncionSustantiva } from "../../services/funcion_sustantiva.service";
import { useAuth0 } from "@auth0/auth0-react";
import ModalAlert from "../ModalAlert";
import ConditionalInput from "../ConditionalInput"

export default function CreateFuncionSustantivaForm() {

    const formRef = useRef();
    const { getAccessTokenSilently } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        let createdFuncionSustantiva = Object.fromEntries(formData.entries());

        // Obtiene token del usuario
        const accessToken = await getAccessTokenSilently();
        createdFuncionSustantiva.cantidad_horas = parseInt(createdFuncionSustantiva.cantidad_horas)
        createdFuncionSustantiva.actividad = parseInt(createdFuncionSustantiva.actividad)
        createdFuncionSustantiva.dependencia = parseInt(createdFuncionSustantiva.dependencia)
        // Llamada a la API para actualizar el usuario
        const response = await createFuncionSustantiva(accessToken, createdFuncionSustantiva);
        if (response.error) {
            console.error('Error updating user:', response.error);
            setModalMessage('Hubo un error al actualizar funcion sustantiva')
        } else {
            console.log('User updated successfully:', response.data);
            setModalMessage('Funcion Sustantiva creado con éxito')
        }
        setModalOpen(true);

    }

    return (
        <>
            <h2 className='text-2xl font-bold mb-2 text-center'>
                Crear funcion sustantiva
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
                                placeholder={"Ingresa el nombre de la funcion sustantiva"}
                                name={"nombre"}>
                            </ConditionalInput>
                        </div>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                            {/* Apellido */}
                            <ConditionalInput
                                label={"Dependencia"}
                                type={"text"}
                                placeholder={"Ingresa la dependencia encargada de esta funcion sustantiva"}
                                name={"dependencia"}></ConditionalInput>
                        </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                            {/* Cedula */}
                            <ConditionalInput
                                label={"Horas"}
                                type={"number"}
                                placeholder={"Ingresa la cantidad de horas semanales de la funcion sustantiva"}
                                name={"cantidad_horas"}
                                inputMode='numeric'></ConditionalInput>
                        </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                            {/* Cedula */}
                            <ConditionalInput
                                label={"Actividad"}
                                type={"number"}
                                placeholder={"Ingresa la actividad asociada a la funcion sustantiva"}
                                name={"actividad"}
                                inputMode='numeric'></ConditionalInput>
                        </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                            {/* Cedula */}
                            <ConditionalInput
                                label={"Descripcion"}
                                type={"text"}
                                placeholder={"Breve descripcion de la funcion sustantiva"}
                                name={"descripcion"}
                            >
                            </ConditionalInput>
                        </div>
                    </div>
                </div>
                <ModalAlert
                    isOpen={modalOpen}
                    messageAlert={modalMessage}
                    close={() => setModalOpen(false)}
                    titleModal={"Crear Funcion Sustantiva"}></ModalAlert>
                <Button color='primary' type='submit'>
                    Guardar
                </Button>
            </form>
        </>
    );
}