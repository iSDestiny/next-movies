const addLeadingZeroToDate = (date: number | string) => {
    return ('0' + date).slice(-2);
};

export default addLeadingZeroToDate;
