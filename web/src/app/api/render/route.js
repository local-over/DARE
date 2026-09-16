import { compile } from '../../../../../src/parser.js';
import { renderPdf } from '../../../../../src/renderers/pdf.js';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
    });
}

export async function POST(request) {
    try {
        const contentType = request.headers.get('content-type') || '';
        let code = '';
        let data = {};

        if (contentType.includes('application/json')) {
            const body = await request.json();
            code = body.code || '';
            data = body.data || {};
        } else {
            const text = await request.text();
            try {
                const parsed = JSON.parse(text);
                if (typeof parsed === 'object' && parsed !== null && parsed.code) {
                    code = parsed.code;
                    data = parsed.data || {};
                } else {
                    code = text;
                }
            } catch {
                code = text;
            }
        }

        if (!code.trim()) {
            return Response.json(
                { error: 'No DARE code provided. Send code as text body or JSON { "code": "..." }' },
                { status: 400, headers: CORS_HEADERS }
            );
        }

        const astData = await compile(code, data);
        const buffer = await renderPdf(astData); 

        return new Response(buffer, {
            headers: {
                ...CORS_HEADERS,
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="document.pdf"'
            }
        });
    } catch (error) {
        console.error("API Error:", error);
        return Response.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500, headers: CORS_HEADERS }
        );
    }
}

