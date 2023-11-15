import { Tooltip, User, Link } from "@nextui-org/react";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { EyeIcon } from "../../icons/EyeIcon";
import { Link as RouterLink } from 'react-router-dom';


// Esta función se encarga de renderizar las celdas
export default function renderUserCell(user, columnKey) {
    const cellValue = user[columnKey];

    switch (columnKey) {
        case "name":
            return (
                <User
                    avatarProps={{ radius: "lg", src: user.picture }}
                    name={user.nickname}
                />
            );
        case "rol":
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{cellValue}</p>
                    <p className="text-bold text-sm capitalize text-default-400">{user.user_metadata.rol}</p>
                </div>
            );
        case "acciones":
            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content="Details">
                        <Link as={RouterLink} to={`/details/${user.email}`}>
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Link>
                    </Tooltip>
                    <Tooltip content="Edit user">
                        <Link as={RouterLink} to={`/edit/${user.email}`}>
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Link>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete user">
                        <Link as={RouterLink} to={`/delete/${user.email}`}>
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
