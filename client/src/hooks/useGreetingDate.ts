import { useEffect, useState } from "react";
import { getGreetingAndDate } from "../utils/getGreetingAndDate";

export function useGreetingDate() {
    const [data, setData] = useState(() => getGreetingAndDate());

    useEffect(() => {
        const interval = setInterval(() => {
            setData(getGreetingAndDate());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return data;
}