import { useState } from "react";
import { BASE_URL } from "../../api";

const useMutation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEntity = async (data: object | null, method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', url: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BASE_URL}${url}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: method !== 'DELETE' ? JSON.stringify(data) : undefined
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos');
            }

            if (response.ok && method === 'DELETE') return "Eliminado correctamente.";

            const result = await response.json();
            return result;
        } catch (err) {
            setError((err as Error).message || 'Ha ocurrido un error');
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return { fetchEntity, loading, error };
};

export default useMutation;
