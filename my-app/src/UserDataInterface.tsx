/*
 * FILE:				  UserDataInterface.tsx
 * PROJECT:			Front end assignment
 * PROGRAMMER:		Tino Restivo
 * FIRST VERSION:	Feb 22, 2026
 * DESCRIPTION:
 * Interface for showing user data on top of page.
 */

export interface UserDataInterface {
  access_token: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}
