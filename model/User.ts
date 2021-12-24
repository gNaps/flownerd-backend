import { Prisma } from "@prisma/client";

export type UserPrisma  = Prisma.userCreateInput & {id?: number}
