import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@nextui-org/react"

export default function SignupButton() {
    const { loginWithRedirect } = useAuth0()
    const handleSignUp = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/profile",
            },
            authorizationParams: {
                screen_hint: "signup",
            },
        })
    }
    return (
        <Button color="primary" variant="solid" onClick={handleSignUp}>
            Registrarse
        </Button>
    )
}