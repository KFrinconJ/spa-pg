import { Button } from "@nextui-org/react"
import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <Button color="danger" variant="ghost" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
        </Button>
    )
}

