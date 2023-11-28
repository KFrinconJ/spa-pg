
import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { updateFuncionSustantiva } from "../../services/funcion_sustantiva.service";
import { useAuth0 } from "@auth0/auth0-react";
import ModalAlert from "../ModalAlert";
import ConditionalInput from "../ConditionalInput"

export default function FuncionSustantivaForm({ dataIn }) {

    const formRef = useRef();
    const { getAccessTokenSilently } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        let updatedFuncionSustantiva = Object.fromEntries(formData.entries());

        // Obtiene token del usuario
        const accessToken = await getAccessTokenSilently();
        updatedFuncionSustantiva.cantidad_horas = parseInt(updatedFuncionSustantiva.cantidad_horas)
        updatedFuncionSustantiva.actividad = parseInt(updatedFuncionSustantiva.actividad)
        updatedFuncionSustantiva.dependencia = parseInt(updatedFuncionSustantiva.dependencia)
        // Llamada a la API para actualizar el usuario
        const response = await updateFuncionSustantiva(accessToken, dataIn.id, updatedFuncionSustantiva);
        if (response.error) {
            console.error('Error updating user:', response.error);
            setModalMessage('Hubo un error al actualizar la funcion sustantiva')
        } else {
            console.log('User updated successfully:', response.data);
            setModalMessage('Funcion sustantiva actualizada con éxito')
        }
        setModalOpen(true);

    }

    return (
        <>
            <h2 className='text-2xl font-bold mb-2 text-center'>
                Detalles de la funcion sustantiva:
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
                                placeholder={"Ingresa el nombre de la funcion sustantiva"}
                                name={"nombre"}></ConditionalInput>
                        </div>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                            {/* Apellido */}
                            <ConditionalInput
                                dataIn={dataIn}
                                label={"Dependencia"}
                                dbData={dataIn.dependencia}
                                type={"text"}
                                placeholder={"Ingresa el nombre de la dependencia encargada"}
                                name={"dependencia"}></ConditionalInput>
                        </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                            {/* Cedula */}
                            <ConditionalInput
                                dataIn={dataIn}
                                label={"Horas"}
                                dbData={dataIn.cantidad_horas}
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
                                dataIn={dataIn}
                                label={"Actividad"}
                                dbData={dataIn.actividad}
                                type={"number"}
                                placeholder={"Ingresa la cantidad de horas semanales de la funcion sustantiva"}
                                name={"actividad"}
                                inputMode='numeric'></ConditionalInput>
                        </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                            {/* Cedula */}
                            <ConditionalInput
                                dataIn={dataIn}
                                label={"Descripcion"}
                                dbData={dataIn.descripcion}
                                type={"text"}
                                placeholder={"Ingresa la descripcion"}
                                name={"descripcion"}
                            ></ConditionalInput>
                        </div>
                    </div>
                </div>
                <ModalAlert
                    isOpen={modalOpen}
                    messageAlert={modalMessage}
                    close={() => setModalOpen(false)}
                    titleModal={"Actualizar Funcion Sustantiva"}></ModalAlert>
                <Button color='primary' type='submit'>
                    Actualizar
                </Button>
            </form>
        </>
    );
}