import { NextFunction, Request, Response } from "express"

export function paginationMiddleware(req: Request, res: Response, next: NextFunction){
    const pageNum = req.query.page; const perPage = req.query.perPage
    let cookedSkip: number | undefined = undefined; let cookedTake: number | undefined = undefined
    
    if (!perPage){
        res.status(400).json({"message": "Wrong page or perPage"})
        return
    }
    if (isNaN(+perPage)){
        res.status(400).json({"message": "Wrong skip or take"})
        return
    }
    if (+perPage < 0 || Math.round(+perPage) != +perPage){
        res.status(400).json({"message": "Wrong skip or take"})
        return
    }
    if (!pageNum){
        res.status(400).json({"message": "Wrong page or perPage"})
        return
    }
    if (isNaN(+pageNum)){
        res.status(400).json({"message": "Wrong page or perPage"})
        return
    }
    if (+pageNum < 0 || Math.round(+pageNum) != +pageNum){
        res.status(400).json({"message": "Wrong page or perPage"})
        return
    }
    cookedTake = +perPage
    cookedSkip = +pageNum * +perPage
    res.locals.take = cookedTake
    res.locals.skip = cookedSkip
    next()
}