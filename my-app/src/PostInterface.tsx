/*
 * FILE:				  PostInterface.tsx
 * PROJECT:			Front end assignment
 * PROGRAMMER:		Tino Restivo
 * FIRST VERSION:	Feb 22, 2026
 * DESCRIPTION:
 * Interface for the Posts.
 */
export interface PostInterface {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  totalLikes: number;
  totalRead: number;
}
