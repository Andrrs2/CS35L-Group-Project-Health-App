const secondsToHms = s => ({
    hr: ((s - s % 3600) / 3600) % 60,
    min: ((s - s % 60) / 60) % 60,
    sec: s % 60
});

export default secondsToHms;