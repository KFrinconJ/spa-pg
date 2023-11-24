import { Select, SelectItem } from "@nextui-org/select";
import { Spinner } from "@nextui-org/spinner";
import { useUsers } from "../../hooks/useUsers";

export default function UserSelect({ onUserSelect }) { // Recibimos onUserSelect como prop

    const { usersList, isLoading } = useUsers()
    if (isLoading) {
        return (
            <div className="container flex justify-center">
                <Spinner label="Loading..." color="warning" />
            </div>
        )
    }

    const docentes = usersList.filter(usaurio => usaurio.user_metadata.rol == "Docente")
    return (
        <Select
            items={docentes}
            label="Docente"
            placeholder="Seleccionar el docente"
            className="max-w-xs"
            onChange={(e) => onUserSelect(e.target.value)} // Usamos onUserSelect para cambiar el estado cuando se selecciona un usuario
        >
            {(docente) => <SelectItem key={docente.email}>{docente.email}</SelectItem>}
        </Select>
    )
}
