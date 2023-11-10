import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@nextui-org/react"

export default function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/dashboard",
            },
        })
    }

    return (
        <Button color="primary" variant="solid" onClick={handleLogin}>
            Iniciar Sesión
        </Button>
    )
}

