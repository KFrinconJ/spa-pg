
import { useRef, useState } from "react";
import { Accordion, AccordionItem, Button, Select, SelectItem, Avatar, Spinner } from "@nextui-org/react";
import { assignRolAuthUsuario, updateAuthUsuario } from "../../services/usuario.service";
import { useAuth0 } from "@auth0/auth0-react";
import ModalAlert from "../ModalAlert";
import { useAuthUserDetail } from "../../hooks/useAuthUserDetail";

export default function AuthUpdateUser({ id }) {

    const userId = `auth0|${id}`

    const rolList = [
        { label: "Administrador", value: "rol_5CryHwhK15QgQHdj" },
        { label: "Director de Programa Academico", value: "rol_xOYs6Wxaxr579f61" },
        { label: "Docente", value: "rol_3j1sfaNSDw6mJ3gi" },
    ];

    const blokedUser = [
        { label: "No", value: false },
        { label: "Si", value: true },

    ]

    const { authUserInfo, authLoading } = useAuthUserDetail(userId)


    const formRef = useRef();
    const { getAccessTokenSilently } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        let updatedUser = Object.fromEntries(formData.entries());

        let rol_user = {
            roles: [updatedUser.user_metadata,]
        }

        if (updatedUser.user_metadata === rolList[0].value) {
            updatedUser.user_metadata = { "rol": rolList[0].label }
        }
        if (updatedUser.user_metadata === rolList[1].value) {
            updatedUser.user_metadata = { "rol": rolList[1].label }
        }
        if (updatedUser.user_metadata === rolList[2].value) {
            updatedUser.user_metadata = { "rol": rolList[2].label }
        }
        // Obtiene token del usuario
        const accessToken = await getAccessTokenSilently();

        if (updatedUser.blocked == "Si") {
            updatedUser.blocked = true
        }
        else {
            updatedUser.blocked = false
        }
        console.log(updatedUser)
        // Llamada a la API para actualizar el usuario
        const responseUserRol = await assignRolAuthUsuario(accessToken, userId, rol_user)
        const response = await updateAuthUsuario(accessToken, userId, updatedUser);
        if (response.error) {
            console.error('Error updating user:', response.error);
            console.error('Error actualizando el rol:', responseUserRol.error)
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
            <Accordion >
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
                                    {/* Bloquear usuario */}
                                    {authUserInfo.blocked ? <Select
                                        name="blocked"
                                        label='Bloquear Usuario'
                                        placeholder='¿Bloquear este usuario?'
                                        className='max-w-xs'
                                        defaultSelectedKeys={["Si"]}>
                                        {blokedUser.map((option) => (<SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>))}
                                    </Select> : <Select
                                        name="blocked"
                                        label='Bloquear Usuario'
                                        placeholder='¿Bloquear este usuario?'
                                        className='max-w-xs'
                                        defaultSelectedKeys={["No"]}>
                                        {blokedUser.map((option) => (<SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>))}
                                    </Select>}
                                </div>
                                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                                    {/* Roles */}
                                    {authUserInfo.user_metadata.rol ? <Select
                                        name="user_metadata"
                                        label='Rol en el Sistema'
                                        placeholder='Seleccione un rol'
                                        defaultSelectedKeys={[authUserInfo.user_metadata.rol]}
                                        className='max-w-xs'>
                                        {rolList.map((rol) => (
                                            <SelectItem key={rol.value} value={rol.value}>
                                                {rol.label}
                                            </SelectItem>
                                        ))}
                                    </Select> : <Select
                                        name="user_metadata"
                                        label='Rol en el Sistema'
                                        placeholder='Seleccione un rol'
                                        defaultSelectedKeys={["Aun no tiene un rol asignado"]}
                                        className='max-w-xs'>
                                        {rolList.map((rol) => (
                                            <SelectItem key={rol.value} value={rol.value}>
                                                {rol.label}
                                            </SelectItem>
                                        ))}
                                    </Select>}
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