import { compile } from './src/parser.js';
import { renderPdf } from './src/renderers/pdf.js';
import fs from 'fs';

const code = `@setup {
  format: A4;
  $title: size=24 bold color=red;
}
@doc {
  page {
    box(bg=#eee p=20) {
      txt($title) { Hello DARE API! }
    }
  }
}`;

async function test() {
  const ast = await compile(code, {});
  console.dir(ast, {depth: null});
  const buf = await renderPdf(ast);
  fs.writeFileSync('test_output.pdf', buf);
  console.log('Done');
}
test();
