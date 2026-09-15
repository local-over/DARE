const pdfmake = require('pdfmake');
const fs = require('fs');

pdfmake.setFonts({
    Roboto: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    }
});

const docDefinition = {
    content: [
        {
            columns: [
                { width: '*', text: '' },
                {
                    width: 'auto',
                    table: {
                        widths: [100],
                        body: [[{ text: 'Box', alignment: 'center' }]]
                    },
                    margin: [0, 10, 0, 10]
                },
                { width: '*', text: '' }
            ]
        }
    ]
};

const pdfDoc = pdfmake.createPdf(docDefinition);
pdfDoc.write('/tmp/test_center.pdf').then(() => {
    console.log("PDF generated!");
});
