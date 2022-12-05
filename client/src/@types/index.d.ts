declare module "*.png";

type Post = { postid: number, title: string, description: string, price?: number, postcode?: number, postimage?: string, createdat: string, username?: string, avatar?: string }

type Posts = Post[]
