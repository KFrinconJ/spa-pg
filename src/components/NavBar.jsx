import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserInfo from "./UserInfo";
import LoginButton from "./buttons/LoginButton";
import { Link as RouterLink } from 'react-router-dom';





export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoading, isAuthenticated } = useAuth0();




  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link as={RouterLink} to={"/"} color="foreground">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to={"/profile"} color="foreground" as={RouterLink}>
            Perfil
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={RouterLink} to={"/admin"} color="foreground" href="/admin">
            Admin
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">

        {/* TODO : Por que se renderiza de nuevo el usuario?? */}

        {/* Cambia si hay el usuario entro en el sistema */}
        {isAuthenticated && !isLoading ? <UserInfo /> : <LoginButton />}


      </NavbarContent>


      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
