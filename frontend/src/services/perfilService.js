import { getAccessToken } from './authService';


export async function obtenerPerfil() {
    const token = getAccessToken();
    const response = await fetch('http://localhost:8000/api/user/perfil/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener el perfil');
    }

    return await response.json();
}
