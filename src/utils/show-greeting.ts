export const showGreeting = (): string => {
    // Get user's timezone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Get the current time in hours
    const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: userTimeZone, hour12: false });
    const hour = parseInt(currentTime.split(':')[0], 10);

    let greeting: string;

    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 14) {
        greeting = 'Good Noon';
    } else if (hour >= 14 && hour < 17) {
        greeting = 'Good Afternoon';
    } else if (hour >= 17 && hour < 20) {
        greeting = 'Good Evening';
    } else {
        greeting = 'Good Night';
    }

    return greeting;
};
