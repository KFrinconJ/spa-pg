import React from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { Link as RouterLink } from 'react-router-dom';


export default function CardItem({ cardTitle, cardLink, cardImg, cardAltImg }) {



    return (

        <Card className="max-w-[400px]" as={RouterLink} to={cardLink}>
            <CardHeader className="flex gap-3">
                <Image
                    alt={cardAltImg}
                    height={40}
                    radius="sm"
                    src={cardImg}
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md"> {cardTitle} </p>
                </div>
            </CardHeader>

        </Card>
    );
}
