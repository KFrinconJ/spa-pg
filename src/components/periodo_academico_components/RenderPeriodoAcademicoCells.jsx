import { Tooltip, Link } from "@nextui-org/react";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { Link as RouterLink } from 'react-router-dom';

// Esta función se encarga de renderizar las celdas
export default function RenderPeriodoAcademicoCell(data, columnKey) {
    const cellValue = data[columnKey];

    switch (columnKey) {
        case "nombre":
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{cellValue}</p>
                </div>
            );
        case "fecha_inicio":
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{cellValue}</p>
                </div>
            );
        case "fecha_fin":
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm">{cellValue}</p>
                </div>
            );
        case "activo":
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm">{cellValue}</p>
                </div>
            );
        case "acciones":
            return (
                <div className="relative flex items-center gap-2">

                    <Tooltip content="Editar periodo academico">
                        <Link as={RouterLink} to={`editar/${data.id}`}>
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Link>
                    </Tooltip>
                    <Tooltip color="danger" content="Eliminar periodo academico">
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
