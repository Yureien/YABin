export function secondsToDHM(seconds: number) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { days, hours, minutes };
}

export function DHMToSeconds({
    days,
    hours,
    minutes,
}: {
    days?: number;
    hours?: number;
    minutes?: number;
}) {
    return (days ?? 0) * 3600 * 24 + (hours ?? 0) * 3600 + (minutes ?? 0) * 60;
}
