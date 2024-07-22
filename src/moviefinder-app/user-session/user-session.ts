import type { UserId } from "../data/user-id"
import type { UserSessionId } from "../data/user-session-id"

export type UserSession = {
    userSessionId: UserSessionId
    userId: UserId
}