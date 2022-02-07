export interface ICategory{
    id: number | string;
    name: string;
    createdOn: string | Date;
    archived: boolean
}

export interface ITag{
    tag: string;
    id: string | number
}
export interface IRole{
    id: number;
    version: number | null;
    createdDate: string;
    createdBy: string |null;
    lastModified: string;
    lastModifiedBy: string | null;
    roleName: string;
}
export interface IUser{
    id: number;
    version: number;
    createdDate: string;
    createdBy: null;
    lastModified: string;
    username: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    active: boolean | null;
    roles: IRole []
}

export interface IArticle{
    id: number;
    title: string;
    content: string;
    summary: string;
    prompt: string;
    tags: ITag[];
    createdOn: string;
    lastModified: string;
    published: boolean;
    comments: IComment[];
    category: string;
    archived: boolean
}
export interface IComment{
    id: number;
    firstName: string;
    lastName: string;
    content: string;
    createdOn: string;
}