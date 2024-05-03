import {createUserRole, getRoleByName} from "../../repositories/users/index.js";

export async function createDefaultUserRoles(id) {
    const defaultRole = await getRoleByName("User")

    if (!defaultRole) {
        throw new Error("Could not find a default role for the user")
    }

    return [await createUserRole({
        userId: id,
        roleId: defaultRole.id
    })]
}