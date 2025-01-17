import { SetMetadata } from '@nestjs/common';

/**
 * Custom decorator to specify required roles for a route.
 * Attaches metadata that can be used by guards (e.g., RolesGuard).
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
