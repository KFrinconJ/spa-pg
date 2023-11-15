
import { useRef, useState } from "react";
import { Accordion, AccordionItem, Button, Select, SelectItem, Avatar, Spinner } from "@nextui-org/react";
import ConditionalInput from "./ConditionalInput";
import { updateDbUsuario } from "../../services/usuario.service";
import { useAuth0 } from "@auth0/auth0-react";
import ModalAlert from "../ModalAlert";
import { useAuthUserDetail } from "../../hooks/useAuthUserDetail";

export default function AuthUpdateUser({ id }) {

    const userId = `auth0|${id}`

    const rolList = [
        { label: "Administrador", value: "Administrador" },
        { label: "Director de Programa Academico", value: "DP" },
        { label: "Docente", value: "Docente" },
    ];

    const { authUserInfo, authLoading } = useAuthUserDetail(userId)



    const formRef = useRef();
    const { getAccessTokenSilently } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        let updatedUser = Object.fromEntries(formData.entries());

        // Obtiene token del usuario
        const accessToken = await getAccessTokenSilently();
        updatedUser.horas_laborales = parseInt(updatedUser.horas_laborales, 10)
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

    if (authLoading) {
        return (
            <div className="container flex justify-center">
                <Spinner label="Loading..." color="warning" />
            </div>
        )
    }


    if (authUserInfo) {
        return (
            <Accordion selectionMode="multiple">
                <AccordionItem
                    key="1"
                    aria-label={authUserInfo.nickname}
                    startContent={
                        <Avatar
                            isBordered
                            color="primary"
                            radius="lg"
                            src={authUserInfo.picture}
                        />
                    }
                    title={authUserInfo.nickname}
                    subtitle="Información adicional desde Auth0"
                >
                    <h2 className='text-2xl font-bold mb-2 text-center'>
                        Detalles del usuario:
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
                                        dataIn={authUserInfo}
                                        label={"Nombre"}
                                        dbData={authUserInfo.email}
                                        type={"text"}
                                        placeholder={"Ingresa el Nombre"}
                                        name={"nombre"}></ConditionalInput>
                                </div>
                                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                                    {/* Apellido */}
                                    <ConditionalInput
                                        dataIn={authUserInfo}
                                        label={"Apellido"}
                                        dbData={authUserInfo.email}
                                        type={"text"}
                                        placeholder={"Ingresa el Apellido"}
                                        name={"apellido"}></ConditionalInput>
                                </div>
                            </div>
                            <div className='flex flex-wrap -mx-3 mb-6'>
                                <div className='w-full px-3'>
                                    {/* Cedula */}
                                    <ConditionalInput
                                        dataIn={authUserInfo}
                                        label={"Cédula"}
                                        dbData={authUserInfo.email}
                                        type={"number"}
                                        placeholder={"Ingresa el número de identificación"}
                                        name={"cedula"}
                                        inputMode='numeric'></ConditionalInput>
                                </div>
                            </div>
                            <div className='flex flex-wrap -mx-3 mb-6'>
                                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                                    {/* Horas Laborales */}
                                    <ConditionalInput
                                        dataIn={authUserInfo}
                                        label={"Horas Laborales"}
                                        dbData={authUserInfo.email}
                                        type={"text"}
                                        name={"horas_laborales"}
                                        placeholder={
                                            "Ingresa el numero de horas laborales"
                                        }></ConditionalInput>
                                </div>
                                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                                    {/* Programa Academico */}
                                    <Select
                                        name="Rol"
                                        label='Roles del Sistema'
                                        placeholder='Seleccione un rol'
                                        className='max-w-xs'>
                                        {rolList.map((rol) => (
                                            <SelectItem key={rol.value} value={rol.value}>
                                                {rol.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
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

                </AccordionItem>
            </Accordion>
        );
    }
}