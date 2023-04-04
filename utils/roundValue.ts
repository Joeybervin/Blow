const roundValue = (value: number): number => {
    return value - Math.floor(value) >= 0.5 ? Math.ceil(value) : Math.floor(value);
};

export default roundValue;