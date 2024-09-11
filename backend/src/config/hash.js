import bcrypt from "bcrypt";

const saltRounds=10;

export const createHash = async function (password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const compareHash = async function (password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch
}
