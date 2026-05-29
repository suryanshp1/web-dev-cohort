import { db } from "../db/index.js";
import { urlsTable } from "../models/url.model.js";

export async function insertUrl(shortCode, url, userId) {
    
    const [result] = await db.insert(urlsTable).values({
        shortCode: shortCode,
        target: url,
        userId: userId,
    }).returning({ id: urlsTable.id, shortCode: urlsTable.shortCode, targetURL: urlsTable.target })

    return result
}