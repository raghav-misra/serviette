import { Request } from "express";

export default async function greetingByName({ query }: Request) {
    if (query.name) {
        return {
            code: 200,
            data: {
                success: true,
                data: {  
                    greeting: `xd Hiiiiii, ${query.name}`
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