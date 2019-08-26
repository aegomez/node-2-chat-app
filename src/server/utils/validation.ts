const isRealString = (str: any) => typeof str === 'string' && str.trim().length > 0;

export { isRealString }