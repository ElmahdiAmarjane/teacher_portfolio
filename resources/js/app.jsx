import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// Layouts
import AdminLayout from '@/Layouts/AdminLayout';
import StudentLayout from '@/Layouts/StudentLayout';
import MinimalLayout from '@/Layouts/MinimalLayout';
import DashboardLayout from '@/Layouts/DashboardLayout';

// Context
import { AlertProvider } from '@/Components/alerts/AlertContext';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        if (name === 'NotFound') {
            return import('@/Components/NotFound.jsx').then((module) => module.default);
        }

        const page = resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'));

        page.then((module) => {
            // Layout dynamique en fonction de props.layout (envoyé depuis Laravel)
            module.default.layout = (page) => {
                const layoutType = page.props.layout;

                // Si page spécifique
                if (name.startsWith('Dashboard') || ['Users', 'Publications', 'Blog'].includes(name)) {
                    return <DashboardLayout>{page}</DashboardLayout>;
                }

                switch (layoutType) {
                    case 'admin':
                        return <AdminLayout>{page}</AdminLayout>;
                    case 'student':
                        return <StudentLayout>{page}</StudentLayout>;
                    case 'minimal':
                        return <MinimalLayout>{page}</MinimalLayout>;
                    default:
                        return <MinimalLayout>{page}</MinimalLayout>; // fallback
                }
            };

            return module;
        });

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <AlertProvider>
                <App {...props} />
            </AlertProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
