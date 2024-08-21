import { Err, Ok } from "../../shared/result"
import type { UserSessionId } from "../../shared/user-session-id"
import type { UserSession } from "../user-session"
import type { UserSessionDb } from "./user-session-db"

export const UserSessionDbImplInMemory = (): UserSessionDb => {
    const userSessions = new Map<UserSessionId, UserSession>()
    return {
        async get(userSessionId) {
            const got = userSessions.get(userSessionId)
            return Ok(got ?? null)
        },
        async put(userSession) {
            userSessions.set(userSession.userSessionId, userSession)
            return Ok(null)
        }
    }
}
    