function capitalize(s): string {
    return s.toLowerCase().replace(/\b./g, function(a) {
        return a.toUpperCase();
    });
}

export { capitalize };
