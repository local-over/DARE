export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const LIVE_PREVIEW_API = 'https://dare-api-server.onrender.com/api/preview';

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
        const response = await fetch(LIVE_PREVIEW_API, {
            method: 'POST',
            headers: {
                'Content-Type': request.headers.get('content-type') || 'application/json',
            },
            body: bodyText,
        });

        const json = await response.json();
        return Response.json(json, {
            status: response.status,
            headers: CORS_HEADERS,
        });
    } catch (error) {
        console.error("Preview Proxy Error:", error);
        return Response.json(
            { error: error.message || 'Internal Proxy Error' },
            { status: 500, headers: CORS_HEADERS }
        );
    }
}
