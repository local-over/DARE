export const runtime = 'edge';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
    return Response.json(
        { status: 'ok', engine: 'DARE v3.0 (Cloudflare Edge)' },
        { headers: CORS_HEADERS }
    );
}
