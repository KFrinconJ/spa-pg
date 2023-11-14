
import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import ConditionalInput from "./ConditionalInput";
import { updateDbUsuario } from "../../services/usuario.service";
import { useAuth0 } from "@auth0/auth0-react";
import ModalAlert from "../ModalAlert";

export default function CreateUserForm() {

    const formRef = useRef();
    const { getAccessTokenSilently } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Habilitar todos los campos del formulario
        Array.from(formRef.current.elements).forEach(field => {
            field.disabled = false;
        });
        const formData = new FormData(formRef.current);
        let updatedUser = Object.fromEntries(formData.entries());
        // Obtiene token del usuario
        const accessToken = await getAccessTokenSilently();
        Array.from(formRef.current.elements).forEach(field => {
            if (field.name === 'horas_laborales' || field.name === 'programa') {
                field.disabled = true;
            }
        });
        updatedUser.cedula = parseInt(updatedUser.cedula, 10)
        // Llamada a la API para actualizar el usuario
        const response = await updateDbUsuario(accessToken, dataIn.email, updatedUser);
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
            <h2 className="text-2xl font-bold mb-2 text-center">Detalles del usuario:</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-5 flex flex-col items-center">
                <div className="container">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            {/* Nombre */}
                            <ConditionalInput
                                dataIn={dataIn}
                                label={"Nombre"}
                                dbData={dataIn.nombre}
                                type={"text"}
                                placeholder={"Ingresa el Nombre"}
                                name={"nombre"}
                            ></ConditionalInput>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0" >
                            {/* Apellido */}
                            <ConditionalInput
                                dataIn={dataIn}
                                label={"Apellido"}
                                dbData={dataIn.apellido}
                                type={"text"}
                                placeholder={"Ingresa el Apellido"}
                                name={"apellido"}
                            ></ConditionalInput>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            {/* Cedula */}
                            <ConditionalInput
                                dataIn={dataIn}
                                label={"Cédula"}
                                dbData={dataIn.cedula}
                                type={"number"}
                                placeholder={"Ingresa el número de identificación"}
                                name={"cedula"}
                                inputMode="numeric"
                            ></ConditionalInput>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            {/* Horas Laborales */}
                            <ConditionalInput
                                dataIn={dataIn}
                                label={"Horas Laborales"}
                                dbData={dataIn.horas_laborales}
                                type={"text"}
                                disabled={true}
                                name={"horas_laborales"}
                                placeholder={"Ingresa el numero de horas laborales"}
                            ></ConditionalInput>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0" >
                            {/* Programa Academico */}
                            <ConditionalInput
                                dataIn={dataIn}
                                label={"Programa Académico"}
                                dbData={dataIn.programa}
                                type={"tel"}
                                disabled={true}
                                name={"programa"}
                            ></ConditionalInput>
                        </div>
                    </div>
                </div>
                <ModalAlert
                    isOpen={modalOpen}
                    messageAlert={modalMessage}
                    close={() => setModalOpen(false)}
                    titleModal={"Actualizar Usuario"}>
                </ModalAlert>
                <Button color="primary" type="submit">Actualizar</Button>
            </form>
        </>
    );
}