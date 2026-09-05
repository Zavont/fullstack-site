import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <Link to="/" className="logo" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <span>FullStack</span>Notes
                </Link>
                <p>&copy; 2026 FullStackNotes Inc. Built using pure CSS & vanilla JS (now React). Designed for high fidelity developer education.</p>
            </div>
        </footer>
    );
}
