import {hashSync, compareSync, genSaltSync} from "bcrypt"
import {createUser, getRolesByIds, getUserByEmail, getRolesByUser} from "../../repositories/users/index.js";
import {createDefaultUserRoles} from "./permissions-service.js";

function getUserClientModel(user, roles) {
    const { passwordHash, ...publicUserFields } = user;

    return {
        ...publicUserFields,
        roles: roles.map((role) => role.name)
    }
}

export async function register(credentials) {
    const { password, ...userData } = credentials
    const passwordHash = hashSync(credentials.password, genSaltSync(10))

    const user = await createUser({
        ...userData,
        passwordHash
    })
    const userRoles = await createDefaultUserRoles(user.id)
    const roles = await getRolesByIds(userRoles.map((userRole) => userRole.roleId))

    return getUserClientModel(user, roles);
}

export async function authenticate(email, password) {
    const user = await getUserByEmail(email);

    if (!compareSync(password, user.passwordHash)) {
        return false
    }

    const roles = await getRolesByUser(user.id)

    return getUserClientModel(user, roles)
}