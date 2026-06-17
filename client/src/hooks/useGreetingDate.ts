import { useEffect, useState } from "react";
import { getGreetingAndDate } from "../utils/getGreetingAndDate";

type GreetingDate = ReturnType<typeof getGreetingAndDate>;

export function useGreetingDate(): GreetingDate {
    const [data, setData] = useState<GreetingDate>(() =>
        getGreetingAndDate()
    );

    useEffect(() => {
        const interval: ReturnType<typeof setInterval> = setInterval(() => {
            setData(getGreetingAndDate());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return data;
}