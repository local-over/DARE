export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { compile } from '../../../../../src/parser.js';
import { renderPdf } from '../../../../../src/renderers/pdf.js';

export async function POST(request) {
    try {
        const body = await request.json();
        const code = body.code || '';
        const data = body.data || {};

        const astData = await compile(code, data);
        
        // renderPdf returns a Uint8Array when no outputPath is provided (Edge compatible)
        const buffer = await renderPdf(astData); 

        return new Response(buffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="document.pdf"'
            }
        });
    } catch (error) {
        console.error("API Error:", error);
        return Response.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
