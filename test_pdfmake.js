const pdfmake = require('pdfmake');
const fs = require('fs');

pdfmake.setFonts({
    Roboto: {
        normal: 'Helvetica'
    }
});

const doc = {
    content: [
        { text: 'Testing Canvas' },
        {
            columns: [
                {
                    canvas: [
                        {
                            type: 'polyline',
                            closePath: true,
                            points: [ { x: 25, y: 0 }, { x: 0, y: 50 }, { x: 50, y: 50 } ],
                            color: '#c2410c'
                        }
                    ],
                    width: 'auto'
                },
                {
                    canvas: [
                        {
                            type: 'ellipse',
                            x: 25, y: 25,
                            r1: 25, r2: 25,
                            color: '#38bdf8'
                        }
                    ],
                    width: 'auto'
                }
            ]
        }
    ]
};

const pdf = pdfmake.createPdf(doc);
pdf.write('test_canvas.pdf').then(() => console.log('Done'));
