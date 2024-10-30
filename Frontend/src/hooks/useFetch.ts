import { useEffect, useState, useCallback } from "react";
import { BASE_URL } from '../../api';

interface Props<T> {
    url: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: object | null;
}

export const useFetch = <T>({ url, method, body }: Props<T>) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T>();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BASE_URL}${url}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify(body) : null,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json() as T; // Se espera un array de tipo T
            setData(result);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setIsLoading(false);
        }
    }, [url, method, body]);

    // Llama a fetchData en el useEffect
    useEffect(() => {
        fetchData();
    }, [fetchData]); // Solo se ejecuta cuando cambia la función fetchData

    return {
        isLoading,
        error,
        data,
        refetch: fetchData, // Devuelve la función de refetch
    };
};
