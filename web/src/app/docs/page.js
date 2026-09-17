'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { indexDoc, componentsDoc, stylingDoc, usageDoc } from '../../docsContent';

export default function DocsPage() {
  const sections = [
    { id: 'intro', title: '1. Introduction' },
    { id: 'components', title: '2. Components Reference' },
    { id: 'styling', title: '3. Styling & Layout' },
    { id: 'usage', title: '4. Usage & APIs' },
  ];

  const MarkdownRenderer = ({ content }) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({node, ...props}) => <h1 className="text-3xl font-bold font-mono text-white border-b border-white/10 pb-3 mt-12 mb-6" {...props} />,
        h2: ({node, ...props}) => <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3 mt-10 mb-5" {...props} />,
        h3: ({node, ...props}) => <h3 className="text-xl font-bold font-mono text-white mt-8 mb-4" {...props} />,
        p: ({node, ...props}) => <p className="text-neutral-300 text-sm leading-relaxed mb-4" {...props} />,
        ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 text-neutral-300 text-sm leading-relaxed mb-4 space-y-2" {...props} />,
        li: ({node, ...props}) => <li className="text-neutral-300" {...props} />,
        code: ({node, inline, className, children, ...props}) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline ? (
            <pre className="p-4 rounded-xl border border-white/10 bg-neutral-950 font-mono text-[11px] md:text-xs text-green-400 overflow-x-auto mb-6">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code className="px-1.5 py-0.5 rounded bg-white/10 text-blue-300 font-mono text-[11px]" {...props}>
              {children}
            </code>
          )
        },
        a: ({node, ...props}) => <a className="text-green-400 hover:text-green-300 underline" {...props} />,
        table: ({node, ...props}) => <div className="overflow-x-auto mb-6"><table className="w-full text-left border-collapse" {...props} /></div>,
        th: ({node, ...props}) => <th className="border-b border-white/20 p-2 font-mono text-white text-xs" {...props} />,
        td: ({node, ...props}) => <td className="border-b border-white/10 p-2 text-neutral-300 text-sm" {...props} />,
        blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-green-500 pl-4 py-1 my-4 bg-green-500/10 text-green-200 text-sm rounded-r-lg" {...props} />
      }}
    >
      {content}
    </ReactMarkdown>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-white/10 space-y-3">
          <h1 className="text-4xl font-extrabold font-mono tracking-tight text-white">DARE Documentation</h1>
          <p className="text-neutral-400 text-sm max-w-2xl">
            Complete exhaustive technical specification, syntax reference, component registry, and API endpoints.
          </p>
        </div>

        {/* Layout: Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl border border-white/10 bg-neutral-950/80 space-y-3 font-mono text-xs">
              <h3 className="text-neutral-400 uppercase tracking-widest text-[10px] mb-4">Table of Contents</h3>
              <ul className="space-y-2">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`} className="text-neutral-400 hover:text-white transition-colors block py-1">
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Docs Content */}
          <main className="lg:col-span-3 space-y-16">
            <section id="intro">
              <MarkdownRenderer content={indexDoc} />
            </section>
            
            <section id="components">
              <MarkdownRenderer content={componentsDoc} />
            </section>
            
            <section id="styling">
              <MarkdownRenderer content={stylingDoc} />
            </section>
            
            <section id="usage">
              <MarkdownRenderer content={usageDoc} />
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
