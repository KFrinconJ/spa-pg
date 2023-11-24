import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Divider, Spinner } from "@nextui-org/react";

export default function FuncionesSustantivasList({ funcionesSustantivas }) {
    const [dragging, setDragging] = useState(false);

    const dragStart = (e, funcionSustantiva) => {
        setDragging(funcionSustantiva);
        e.dataTransfer.setData("text/plain", JSON.stringify(funcionSustantiva));
    }

    if (!funcionesSustantivas) {
        return (
            <div className="container flex justify-center">
                <Spinner label="Loading..." color="warning" />
            </div>
        )
    }

    return (
        <div className="flex flex-wrap flex-col justify-around">
            {funcionesSustantivas.map((funcionSustantiva) => (
                <Card 
                    className="max-w-[300px] m-4" 
                    key={funcionSustantiva.id}
                    draggable
                    onDragStart={(e) => dragStart(e, funcionSustantiva)}
                >
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-sm">{funcionSustantiva.nombre}</p>
                            <p className="text-xs text-default-500">{funcionSustantiva.dependencia}</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p className="text-sm">Horas semanales: {funcionSustantiva.cantidad_horas}</p>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
