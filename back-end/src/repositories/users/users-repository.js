import {db, tableNames} from "../../database/index.js";
import {userCreateSchema, userRoleCreateSchema} from "./validation.js";

export async function getUser(id) {
    const usersResult = await db(tableNames.users).where({ id }).select('*').first();
    return usersResult[0];
}

export async function getUserByEmail(email) {
    return db(tableNames.users).where({ email }).select('*').first();
}

export async function createUser(userModel) {
    const { error } = userCreateSchema.validate(userModel);

    if (error) {
        throw new Error(error.message);
    }

    const [createdUser] = await db(tableNames.users).insert(userModel).returning('*');
    return createdUser;
}

export async function createUserRole(userRole) {
    const { error } = userRoleCreateSchema.validate(userRole)

    if (error) {
        throw new Error(error.message);
    }

    const [createdUserRole] = await db(tableNames.userRoles).insert(userRole).returning('*');
    return createdUserRole;
}

export async function getRoleByName(roleName) {
    return db(tableNames.roles).where({ name: roleName }).select('*').first();
}

export async function getRolesByIds(roleIds) {
    return db(tableNames.roles).whereIn("id", roleIds);
}

export async function getRolesByUser(userId) {
    return db(tableNames.userRoles)
        .join(tableNames.roles, `${tableNames.userRoles}.roleId`, `${tableNames.roles}.id`)
        .where(`${tableNames.userRoles}.userId`, userId)
        .select(`${tableNames.roles}.*`);
}