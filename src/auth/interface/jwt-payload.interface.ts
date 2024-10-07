import { USER_ROLE } from '@src/users/types/user';

export interface JwtPayload {
  sub: string; // Representa el ID del usuario
  username: string; // Nombre de usuario
  roles: USER_ROLE[]; // Roles del usuario
}
