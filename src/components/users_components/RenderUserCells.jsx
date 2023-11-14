import { Tooltip, User } from "@nextui-org/react";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { EyeIcon } from "../../icons/EyeIcon";


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
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EyeIcon />
                        </span>
                    </Tooltip>
                    <Tooltip content="Edit user">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete user">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon />
                        </span>
                    </Tooltip>
                </div>
            );
        default:
            return cellValue;
    }
}


