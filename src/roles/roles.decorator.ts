import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles); // Define a custom decorator named Roles that takes a list of roles as arguments and sets the metadata key to the roles array
/*
 * Define a custom decorator named Roles that takes a list of roles as arguments and sets the metadata key to the roles array.
 *
 * A metadata key is a string that uniquely identifies metadata. In this case, the key is 'roles'.
 *
 * The SetMetadata() function is a utility function provided by NestJS to set metadata on a class, method, or property.
 *
 * The Roles() decorator is a factory function that returns the SetMetadata() function with the 'roles' key and the list of roles as arguments.
 *
 * This allows us to apply the Roles() decorator to controllers or methods and specify the roles that are allowed to access them.
 *
 * The roles are stored as metadata and can be retrieved using the reflect-metadata package.
 *
 * We can use the Roles() decorator to restrict access to certain routes based on the roles of the authenticated user. (The endpoint for changing the status of a hall is restricted to users with the 'admin' role.)
 *
 */
