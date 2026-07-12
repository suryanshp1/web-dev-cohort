"use server";

import { prisma } from "@/lib/db";


export async function createTodo(title: string) {
    const todo = await prisma.todo.create({ data: { title } });
    return todo;
}

export async function updateTodo(id: string, title: string) {
    const todo = await prisma.todo.update({ where: { id }, data: { title } });
    return todo;
}

export async function getTodo(id: string) {
    const todo = await prisma.todo.findUnique({ where: { id } });
    return todo;
}

export async function deleteTodo(id: string) {
    const todo = await prisma.todo.delete({ where: { id } });
    return todo;
}