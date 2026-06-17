export function getGreetingAndDate() {
    const now = new Date();
    const hour = now.getHours();

    let greeting = "Hello";

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning ☀️";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon 👋";
    } else if (hour >= 17 && hour < 22) {
        greeting = "Good Evening 🌙";
    } else {
        greeting = "Good Night 🌌";
    }

    const date = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(now);

    return { greeting, date };
}