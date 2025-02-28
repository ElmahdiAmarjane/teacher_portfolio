import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// Import your layouts
import AdminLayout from '@/Layouts/AdminLayout';
import StudentLayout from '@/Layouts/StudentLayout';
import MinimalLayout from '@/Layouts/MinimalLayout';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // Handle components from the `components` folder
        if (name === 'NotFound') {
            return import('@/Components/NotFound.jsx').then(module => module.default);
        }
        // Resolve the page component
        const page = resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'));

        // Dynamically apply the layout based on the `layout` prop
        page.then((module) => {
            module.default.layout = (page) => {
                switch (page.props.layout) {
                    case 'admin':
                        return <AdminLayout>{page}</AdminLayout>;
                    case 'student':
                        return <StudentLayout>{page}</StudentLayout>;
                    case 'minimal':
                        return <MinimalLayout>{page}</MinimalLayout>;
                    default:
                        return <MinimalLayout>{page}</MinimalLayout>; // Fallback layout
                }
            };
            return module;
        });

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});