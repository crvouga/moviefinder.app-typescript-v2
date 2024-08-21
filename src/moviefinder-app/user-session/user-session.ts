import type { UserId } from "../shared/user-id"
import type { UserSessionId } from "../shared/user-session-id"

export type UserSession = {
    userSessionId: UserSessionId
    userId: UserId
}