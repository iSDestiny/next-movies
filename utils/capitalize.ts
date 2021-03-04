const capitalize = (s: string) => {
    if (typeof s !== 'string') return '';
    const strings = s.trim().split(' ');
    const capitalized = strings.map(
        (str) => str.charAt(0).toUpperCase() + str.slice(1)
    );
    return capitalized.join(' ');
};

export default capitalize;
