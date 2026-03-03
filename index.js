export const isCadenceMet = () => {
    const now = new Date();
    const estOffset = -5; // EST
    const hour = now.getUTCHours() + estOffset;
    return hour === 9;
};
