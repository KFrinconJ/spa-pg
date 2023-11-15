import { Accordion, AccordionItem, Avatar, Spinner } from "@nextui-org/react";
import { useAuthUserDetail } from "../../hooks/useAuthUserDetail";

export default function AccordionUser({ id }) {
    const userId = `auth0|${id}`

    const { authUserInfo, authLoading } = useAuthUserDetail(userId)
    console.log(authUserInfo)


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
                    <div className="bg-gray-800 text-white p-6 rounded-lg">
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-center text-indigo-500">Detalles de la cuenta</h3>
                            <p><span className="font-semibold">Rol:</span> {authUserInfo.user_metadata.rol}</p>
                            <p><span className="font-semibold">Último inicio de sesión:</span> {authUserInfo.last_login}</p>
                            <p><span className="font-semibold">Número de inicios de sesión:</span> {authUserInfo.logins_count}</p>
                            <p><span className="font-semibold">Última IP:</span> {authUserInfo.last_ip}</p>
                        </div>
                    </div>
                </AccordionItem>
            </Accordion>
        );
    }
}
