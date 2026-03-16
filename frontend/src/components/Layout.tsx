// Layout.tsx
import React from 'react';

import Navbar from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        // Wrapper
        <div className="flex flex-col min-h-screen w-full">
            <Navbar />

            <main className="bg-red-700">
                {children}
            </main>

            <footer className="py-4 text-center border-t">
                @ 2026 The website
            </footer>
        </div>
    );
};

export default Layout;