export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const PREVIEW_SERVER_URL = 'https://dare-api-server.onrender.com/api/preview';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request) {
    try {
        const bodyText = await request.text();
        const contentType = request.headers.get('content-type') || 'application/json';

        const upstreamRes = await fetch(PREVIEW_SERVER_URL, {
            method: 'POST',
            headers: { 'Content-Type': contentType },
            body: bodyText,
        });

        const data = await upstreamRes.text();

        return new Response(data, {
            status: upstreamRes.status,
            headers: {
                ...CORS_HEADERS,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return Response.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500, headers: CORS_HEADERS }
        );
    }
}
