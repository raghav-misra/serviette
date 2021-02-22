import { Request } from "express";

export async function handler({ query }: Request) {
    if (query.name) {
        return {
            code: 200,
            data: {
                success: true,
                data: {  
                    greeting: `Howdy, ${query.name}`
                }
            }
        };
    }
    
    else {
        return {
            code: 500,
            data: {
                success: false,
                error: "Missing required parameter 'name'."
            }
        };
    }
}