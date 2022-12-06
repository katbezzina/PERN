export declare module "*.png";

export type Post = { postid: number, title?: string, description?: string, price?: number, postcode?: number, postimage?: string, createdat: string, username?: string, avatar?: string };

export type Posts = Post[];

export type Comment = { message: string, messagecreatedat: string, username: string, avatar: string, commentid: number, usersid: number };

export type Comments = Comment[];


