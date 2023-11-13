
import { NavbarContent, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
export default function UserInfo() {

    const { user, logout } = useAuth0()

    const { name, picture, email } = { ...user }


    return (
        <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="secondary"
                        name={name}
                        size="sm"
                        src={picture}
                        alt={name}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Sesión inciada como</p>
                        <p className="font-semibold">{email}</p>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                        Cerrar Sesión
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </NavbarContent>
    )
}

