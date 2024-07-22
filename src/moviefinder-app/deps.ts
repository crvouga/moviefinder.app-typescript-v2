import { UserSessionDbImpl } from "./user-session/user-session-db"
import type { UserSessionDb } from "./user-session/user-session-db/user-session-db"

export type Deps = {
    userSessionDb: UserSessionDb
}

export const getDeps = (): Deps => {
    return {
        userSessionDb: UserSessionDbImpl({ t: "db-conn"})
    }
}
