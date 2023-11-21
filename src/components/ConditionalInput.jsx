import { Input } from "@nextui-org/react";

export default function ConditionalInput({ dataIn, dbData, label, name, type, placeholder = "", disabled = false, inputMode = "" }) {
    return (
        <>
            {dataIn ? (
                <Input
                    type={type}
                    label={label}
                    placeholder={placeholder}
                    defaultValue={dbData}
                    disabled={disabled}
                    name={name}
                    inputMode={inputMode}
                />
            ) : (
                <Input type={type} label={label} placeholder={placeholder} name={name} required />
            )}
        </>
    );
}
