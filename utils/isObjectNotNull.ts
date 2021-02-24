const isObjectNotNull = (obj: Object) => {
    for (var key in obj) if (obj[key]) return true;
    return false;
};

export default isObjectNotNull;
