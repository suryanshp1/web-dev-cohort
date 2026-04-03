import {todoValidationSchema, type Todo} from "../../validation/todo.schema.js"
import type {Request, Response} from "express";

class TodoController {
    private _db: Todo[]

    constructor() {
        this._db = []
    }

    public handleGetAllTodos(req: Request, res: Response) {
        const todos = this._db
        return res.json({ todos })
    }

    public async handleInsertTodo(req: Request, res: Response) {
        try {
            const unvalidated = req.body
            const validatedResult = await todoValidationSchema.parseAsync(unvalidated)
            this._db.push(validatedResult)
            return res.status(201).json({ todo: validatedResult })
        }
        catch (error){
            return res.status(500).json({ error: "Validation failed"} )
        }
    }
}

export default TodoController;