export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const RENDER_SERVER_URL = 'https://dare-api-server.onrender.com/api/render';

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

        const upstreamRes = await fetch(RENDER_SERVER_URL, {
            method: 'POST',
            headers: { 'Content-Type': contentType },
            body: bodyText,
        });

        if (!upstreamRes.ok) {
            const errText = await upstreamRes.text();
            return new Response(errText, {
                status: upstreamRes.status,
                headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
            });
        }

        const pdfBuffer = await upstreamRes.arrayBuffer();

        return new Response(pdfBuffer, {
            status: 200,
            headers: {
                ...CORS_HEADERS,
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="document.pdf"',
            },
        });
    } catch (error) {
        console.error("API Proxy Error:", error);
        return Response.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500, headers: CORS_HEADERS }
        );
    }
}
