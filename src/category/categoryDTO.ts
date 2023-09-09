import { randomUUID } from "crypto";

export class CategoryDTO {
  readonly uuid = randomUUID();
  constructor(readonly name: string) {}
}
