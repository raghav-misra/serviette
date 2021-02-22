export default function secretKey() {
    return {
        code: 200,
        data: {
            key: process.env.SECRET_KEY
        }
    };
}