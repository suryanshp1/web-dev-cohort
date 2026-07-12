import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type Params = {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                {success: false, data: null, error: "ID is required"},
                {status: 400}
            );
        }
        const todo = await prisma.todo.findUnique({
            where: { id },
        });

        if (!todo) {
            return NextResponse.json(
                {success: false, data: null, error: "Todo not found"},
                {status: 404}
            );
        }

        return NextResponse.json(
            {success: true, data: todo},
            {status: 200}
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {success: false, data: null, error: "Failed to fetch todo"},
            {status: 500}
        );
    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const todo = await prisma.todo.delete({
            where: { id }
        });
        return NextResponse.json(
            {success: true, data: todo},
            {status: 200}
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {success: false, data: null, error: "Failed to delete todo"},
            {status: 500}
        );
    }
}

export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const body = await request.json();
        const todo = await prisma.todo.update({
            where: { id }, 
            data: body
        });
        return NextResponse.json(
            {success: true, data: todo},
            {status: 200}
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {success: false, data: null, error: "Failed to update todo"},
            {status: 500}
        );
    }
}