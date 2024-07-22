import { Err } from "../../utils/result"
import type { UserSessionDb } from "./user-session-db"

export const UserSessionDbImplDb = (): UserSessionDb => {
    return {
        async get(userSessionId) {
            return Err('not implemented')
        },
    async    put(userSession) {
            return Err('not implemented')
        }
    }
}
    