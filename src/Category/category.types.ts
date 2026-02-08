import { Request, Response } from 'express';
import { Prisma } from '../generated/prisma/client';


export interface ErrorMessage {
    message: string
};

export type Category = Prisma.CategoryGetPayload<{}>;
export type CategoryCreate = Prisma.CategoryUncheckedCreateInput;

export interface CategoryServiceContract {
    getAllCategories(take?: number, skip?: number): Promise<Category[]>,
    createCategory(data: CategoryCreate): Promise<Category | null>,
    deleteCategory(id: number): Promise<Category | null>
};
export interface CategoryRepositoryContract {
    getAllCategories(take?: number, skip?: number): Promise<Category[]>,
    getCategoryById(id: number): Promise<Category | null>,
    createCategory(data: CategoryCreate): Promise<Category>,
    deleteCategory(id: number): Promise<Category | null>
};
export interface CategoryControllerContract {
    getAllCategories: (req: Request<void, Category[] | ErrorMessage, void, { skip?: string, take?: string }>, res: Response<Category[] | ErrorMessage>) => Promise<void>,
    createCategory: (req: Request<object, Category | ErrorMessage, CategoryCreate>, res: Response<Category | ErrorMessage>) => Promise<void>,
    deleteCategory: (req: Request<{ id: string }, Category | ErrorMessage>, res: Response<Category | ErrorMessage>) => Promise<void>
}
