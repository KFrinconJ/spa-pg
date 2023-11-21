
import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";

import { createProgramaAcademico } from "../../services/programa_academico.service";
import { useAuth0 } from "@auth0/auth0-react";
import ModalAlert from "../ModalAlert";
import ConditionalInput from "../ConditionalInput"

export default function CreateProgramaAcademicoForm() {

    const formRef = useRef();
    const { getAccessTokenSilently } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        let createdCurso = Object.fromEntries(formData.entries());

        // Obtiene token del usuario
        const accessToken = await getAccessTokenSilently();
        createdCurso.cantidad_horas = parseInt(createdCurso.cantidad_horas, 10)
        // Llamada a la API para actualizar el usuario
        const response = await createProgramaAcademico(accessToken, createdCurso);
        if (response.error) {
            console.error('Error updating PA:', response.error);
            setModalMessage('Hubo un error al actualizar el PA')
        } else {
            console.log('PA updated successfully:', response.data);
            setModalMessage('Programa academico creado con éxito')
        }
        setModalOpen(true);

    }

    return (
        <>
            <h2 className='text-2xl font-bold mb-2 text-center'>
                Crear Programa Academico
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
                                placeholder={"Ingresa el nombre del programa academico"}
                                name={"nombre"}></ConditionalInput>
                        </div>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                            {/* Apellido */}
                            <ConditionalInput
                                label={"Codigo SNIES"}
                                type={"text"}
                                placeholder={"Ingresa el codigo snies"}
                                name={"codigo_snies"}></ConditionalInput>
                        </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                            {/* Cedula */}
                            <ConditionalInput
                                label={"Director de Programa"}
                                type={"text"}
                                placeholder={"Ingresa el director del programa academico"}
                                name={"director"}
                            ></ConditionalInput>
                        </div>
                    </div>
                </div>
                <ModalAlert
                    isOpen={modalOpen}
                    messageAlert={modalMessage}
                    close={() => setModalOpen(false)}
                    titleModal={"Crear Programa Academico"}></ModalAlert>
                <Button color='primary' type='submit'>
                    Guardar
                </Button>
            </form>
        </>
    );
}