import { NextRequest, NextResponse } from "next/server";
import { prisma} from "@/lib/db";


export async function GET(request: NextRequest) {
    try {
        const todos = await prisma.todo.findMany();
        return NextResponse.json(
            {success: true, data: todos},
            {status: 200}
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {success: false, data: [], error: "Failed to fetch todos"},
            {status: 500}
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const {title} = await request.json();
        if (!title) {
            return NextResponse.json(
                {success: false, data: [], error: "Title is required"},
                {status: 400}
            );
        }
        const todo = await prisma.todo.create({data: {title}});
        return NextResponse.json(
            {success: true, data: todo},
            {status: 201}
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {success: false, data: [], error: "Failed to create todo"},
            {status: 500}
        );
    }
}


// export async function DELETE(request: NextRequest) {
//     try {
//         const id = request.nextUrl.searchParams.get("id");
//         const todo = await prisma.todo.delete({where: {id: id}});
//         return NextResponse.json(todo);
//     } catch (error) {
//         console.log(error);
//     }
// }

// export async function PUT(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const todo = await prisma.todo.update({where: {id: body.id}, data: body});
//         return NextResponse.json(todo);
//     } catch (error) {
//         console.log(error);
//     }
// }