export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const LIVE_RENDER_API = 'https://dare-api-server.onrender.com/api/render';

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
        const response = await fetch(LIVE_RENDER_API, {
            method: 'POST',
            headers: {
                'Content-Type': request.headers.get('content-type') || 'application/json',
            },
            body: bodyText,
        });

        const pdfBuffer = await response.arrayBuffer();
        return new Response(pdfBuffer, {
            status: response.status,
            headers: {
                ...CORS_HEADERS,
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="document.pdf"',
            },
        });
    } catch (error) {
        console.error("Render Proxy Error:", error);
        return Response.json(
            { error: error.message || 'Internal Proxy Error' },
            { status: 500, headers: CORS_HEADERS }
        );
    }
}
