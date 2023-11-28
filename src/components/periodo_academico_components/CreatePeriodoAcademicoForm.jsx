
import { useRef, useState } from "react";
import { Button ,Select,SelectItem} from "@nextui-org/react";

import { createPeriodoAcademico } from "../../services/periodo_academico.service";
import { useAuth0 } from "@auth0/auth0-react";
import ModalAlert from "../ModalAlert";
import ConditionalInput from "../ConditionalInput"

const periodoAcademicoStatus = [
    { label: "No", value: false },
    { label: "Si", value: true },

]

export default function CreatePeriodoAcademicoForm() {

    const formRef = useRef();
    const { getAccessTokenSilently } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        let createdPeriodoAcademico = Object.fromEntries(formData.entries());

        // Obtiene token del usuario
        const accessToken = await getAccessTokenSilently();
        // Llamada a la API para actualizar el usuario
        const response = await createPeriodoAcademico(accessToken, createdPeriodoAcademico);
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
                Crear Periodo Academico
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
                                placeholder={"Ingresa el nombre del periodo academico"}
                                name={"nombre"}></ConditionalInput>
                        </div>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                            {/* Apellido */}
                            <Select
                                name="activo"
                                label='Estado Periodo Academico'
                                placeholder="¿Periodo Academico Activo?"
                                defaultSelectedKeys={["Si"]}>
                                {periodoAcademicoStatus.map((option) => (<SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>))}
                            </Select>

                        </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                            {/* Nombre */}
                            <ConditionalInput
                                label={"Fecha Inicio"}
                                type={"date"}
                                placeholder={"Fecha inicio del periodo academico"}
                                name={"fecha_inicio"}></ConditionalInput>
                        </div>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                            {/* Apellido */}
                            <ConditionalInput
                                label={"Fecha Fin"}
                                type={"date"}
                                placeholder={"Fecha finalizacion del periodo academico"}
                                name={"fecha_fin"}></ConditionalInput>
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