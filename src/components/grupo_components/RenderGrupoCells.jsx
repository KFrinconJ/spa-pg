import { Tooltip, Link } from "@nextui-org/react";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { EyeIcon } from "../../icons/EyeIcon";
import { Link as RouterLink } from 'react-router-dom';

// Esta función se encarga de renderizar las celdas
export default function RenderGrupoCell(data, columnKey) {
    const cellValue = data[columnKey];

    switch (columnKey) {
        case "nombre":
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{cellValue}</p>
                </div>
            );
        case "acciones":
            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content="Detalles del grupo">
                        <Link as={RouterLink} to={`detalles/${data.id}`}>
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Link>
                    </Tooltip>
                    <Tooltip content="Editar grupo">
                        <Link as={RouterLink} to={`editar/${data.id}`}>
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Link>
                    </Tooltip>
                    <Tooltip color="danger" content="Eliminar grupo">
                        <Link as={RouterLink} to={`eliminar/${data.id}`}>
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Link>
                    </Tooltip>
                </div>
            );
        default:
            return cellValue;
    }
}
