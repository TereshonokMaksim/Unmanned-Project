import { Prisma } from "../generated/prisma";
import { createError } from "./outputError";


export function PrismaErrorCheck(error: Error | Prisma.PrismaClientKnownRequestError | unknown, functionName: string, data?: object){
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code[1] === "1") {
            createError(
                `Connection to DB has failed.\nCheck if you actually connected properly and didn't close it.\nError happened in ${functionName}`,
                `Failed connection to Data Base while processing ${functionName}.`
            )
        }
        else if (error.code in ["P2000", "P2005", "P2006", "P2007"]){
            createError(
                `Client passed wrong/bad values for ${functionName}.`,
                [`Validation error while handling ${functionName}.`, "BAD_QUERY"],
                {"Data": data}
            )
        }
        else if (error.code === "P2002"){
            createError(
                `Client passed values into uniquely constrained fields such as ID.\nError happened in ${functionName}`,
                [`Unique constraint failed while handling ${functionName}.`, "BAD_QUERY"],
                {"Data": data}
            )
        }
        else if (error.code === 'P2009') {
            createError(
                `For some reason it outputted error that it seeks for some columns that dont exists. I dont know either.\nError happened in ${functionName}`,
                [`Incorrect request query for ${functionName}.`, "BAD_QUERY"]
            )
        }
        else if (error.code === 'P2011') {
            createError(
                `Client didn't pass enough values to ${functionName}.`,
                [`NULL value check failed while handling ${functionName}.`, "BAD_QUERY"],
                {"Data": data}
            )
        }
        else if (error.code === 'P2022') {
            createError(
                `Schema problem, check whether you made migrations or not.\nError happened in ${functionName}`,
                `Incorrect schema between migrations and DB in ${functionName}.`
            )
        }
    }
}