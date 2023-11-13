import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

export default function ModalAlert({ messageAlert, isOpen, close, titleModal }) {

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={close}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-center">{titleModal}</ModalHeader>
                    <ModalBody className="text-center">
                        <p>{messageAlert}</p>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
