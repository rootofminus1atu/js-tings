import { Request, Response } from 'express'

export const getUsers = (req: Request, res: Response) => {
    res.json({"message": "all users here"})
}

export const getUserById = (req: Request, res: Response) => {
    let id = req.params.id
    res.json({"message": `get a user ${id} received`})
}

export const createUser = (req: Request, res: Response) => {
    console.log(req.body)
    res.json({"message": `create a new user with data from post message`})
}

export const updateUser = (req: Request, res: Response) => {
    console.log(req.body)
    res.json({"message": `update user ${req.params.id} new user with data from post message`})
}

export const deleteUser = (req: Request, res: Response) => {
    res.json({"message": `delete user ${req.params.id} from the db`})
}