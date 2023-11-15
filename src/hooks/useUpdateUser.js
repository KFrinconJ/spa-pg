import { useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { updateDbUsuario } from "../../services/usuario.service";

export const useUpdateUser = () => {
  const formRef = useRef();
  const { getAccessTokenSilently } = useAuth0();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Habilitar todos los campos del formulario
    Array.from(formRef.current.elements).forEach(field => {
      field.disabled = false;
    });
    const formData = new FormData(formRef.current);
    let updatedUser = Object.fromEntries(formData.entries());
    // Obtiene token del usuario
    const accessToken = await getAccessTokenSilently();
    Array.from(formRef.current.elements).forEach(field => {
      if (field.name === 'horas_laborales' || field.name === 'programa') {
        field.disabled = true;
      }
    });
    updatedUser.cedula = parseInt(updatedUser.cedula, 10)
    // Llamada a la API para actualizar el usuario
    const response = await updateDbUsuario(accessToken, dataIn.email, updatedUser);
    if (response.error) {
      console.error('Error updating user:', response.error);
      setModalMessage('Hubo un error al actualizar el usuario')
    } else {
      console.log('User updated successfully:', response.data);
      setModalMessage('Usuario actualizado con éxito')
    }
    setModalOpen(true);
  }

  return { formRef, modalOpen, setModalOpen, modalMessage, setModalMessage, handleSubmit };
}