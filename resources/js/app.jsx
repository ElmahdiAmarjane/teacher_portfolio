import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { AlertProvider } from '@/Components/alerts/AlertContext';

// Import layouts
import DashboardLayout from '@/Layouts/DashboardLayout';

createInertiaApp({
    resolve: (name) => {
        const page = resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'));
        
        // Automatically apply DashboardLayout to all dashboard pages
        page.then((module) => {
            if (module.default.layout === undefined && 
               (name.startsWith('Dashboard') || 
                name === 'Users' || 
                name === 'Publications' || 
                name === 'Blog')) {
                module.default.layout = (page) => <DashboardLayout>{page}</DashboardLayout>;
            }
            return module;
        });

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <AlertProvider>  {/* Wrap App with AlertProvider */}
                <App {...props} />
            </AlertProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});