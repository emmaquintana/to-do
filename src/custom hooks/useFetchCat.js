import { useState, useEffect } from "react";

export default function useFetchCat() {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        fetchCatAPI();
        return () => { }
    }, []);

    async function fetchCatAPI() {
        setIsPending(true);
        try {
            const res = await fetch("https://api.thecatapi.com/v1/images/search")
            const data = await res.json();
            setData(data);
        }
        catch (err) {
            console.error(err)
        }
        finally {
            setIsPending(false);
        }
    }

    return { data, fetchCatAPI, isPending }
}