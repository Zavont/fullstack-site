import React, { useState } from 'react';

export default function CodeBlock({ filename, codeHtml, rawCode }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(rawCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500); // Hide toast after 2.5s
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <>
            <div className="sandbox-code">
                <div className="code-header">
                    <div className="code-dots">
                        <div className="code-dot"></div>
                        <div className="code-dot"></div>
                        <div className="code-dot"></div>
                    </div>
                    <div className="code-filename">{filename}</div>
                    <button className="btn-copy" onClick={handleCopy} aria-label="Copy code snippet">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        Copy
                    </button>
                </div>
                <div className="code-body">
                    <pre><code dangerouslySetInnerHTML={{ __html: codeHtml }} /></pre>
                </div>
            </div>

            {/* Toast Notification */}
            <div className={`toast ${copied ? 'show' : ''}`} style={{ zIndex: 1000 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
                <div className="toast-text">Copied successfully!</div>
            </div>
        </>
    );
}
