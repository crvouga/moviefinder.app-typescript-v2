import type { UserId } from "../user/user-id"
import type { UserSessionId } from "./user-session-id"

export type UserSession = {
    userSessionId: UserSessionId
    userId: UserId
}