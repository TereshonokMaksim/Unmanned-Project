import { NextFunction, Request, Response } from "express"


const DEFAULT_PER_PAGE = 20
const DEFAULT_PAGE = 0

export function paginationMiddleware(req: Request, res: Response, next: NextFunction){
    const pageNum = req.query.page; const perPage = req.query.perPage
    let cookedSkip: number | undefined = undefined; let cookedTake: number | undefined = undefined
    
    if (!perPage){
        cookedTake = DEFAULT_PER_PAGE
    }
    else{
        if (isNaN(+perPage)){
            res.status(400).json({"message": "Wrong skip or take"})
            return
        }
        if (+perPage < 0 || Math.round(+perPage) != +perPage){
            res.status(400).json({"message": "Wrong skip or take"})
            return
        }
        cookedTake = +perPage
    }
    if (!pageNum){
        cookedSkip = DEFAULT_PAGE * cookedTake
    }
    else {
        if (isNaN(+pageNum)){
            res.status(400).json({"message": "Wrong page or perPage"})
            return
        }
        if (+pageNum < 0 || Math.round(+pageNum) != +pageNum){
            res.status(400).json({"message": "Wrong page or perPage"})
            return
        }
        cookedSkip = +pageNum * cookedTake
    }
    res.locals.take = cookedTake
    res.locals.skip = cookedSkip
    next()
}