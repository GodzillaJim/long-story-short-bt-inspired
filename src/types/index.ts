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