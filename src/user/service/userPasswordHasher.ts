import * as bcrypt from "bcrypt";
const saltRounds = 10;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, passwordHash: string) {
  return await bcrypt.compare(password, passwordHash);
}
