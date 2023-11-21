
import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { updateProgramaAcademico } from "../../services/programa_academico.service";
import { useAuth0 } from "@auth0/auth0-react";
import ModalAlert from "../ModalAlert";
import ConditionalInput from "../ConditionalInput"

export default function UpdateProgramaAcadmicoForm({ dataIn }) {

    const formRef = useRef();
    const { getAccessTokenSilently } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


    console.log(dataIn)


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        let updatedProgramaAcademico = Object.fromEntries(formData.entries());

        // Obtiene token del usuario
        const accessToken = await getAccessTokenSilently();
        updatedProgramaAcademico.codigo_snies = parseInt(updatedProgramaAcademico.codigo_snies, 10)
        // Llamada a la API para actualizar el usuario
        const response = await updateProgramaAcademico(accessToken, dataIn.codigo_snies, updatedProgramaAcademico);
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
                Detalles del curso:
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
                                placeholder={"Ingresa el nombre del programa academico"}
                                name={"nombre"}></ConditionalInput>
                        </div>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                            {/* Apellido */}
                            <ConditionalInput
                                dataIn={dataIn}
                                label={"Codigo SNIES"}
                                dbData={dataIn.codigo_snies}
                                type={"text"}
                                placeholder={"Ingresa snies del programa academico"}
                                name={"codigo_snies"}></ConditionalInput>
                        </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                            {/* Cedula */}
                            <ConditionalInput
                                dataIn={dataIn}
                                label={"Director"}
                                dbData={dataIn.director}
                                type={"text"}
                                placeholder={"Ingresa la cantidad de horas semanales del curso"}
                                name={"director"}
                                ></ConditionalInput>
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