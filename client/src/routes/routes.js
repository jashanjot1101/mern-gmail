import { lazy } from 'react';

const Login=lazy(()=>import('../pages/Login'));
const Signup=lazy(()=>import('../pages/Signup'));
const Main = lazy(() => import('../pages/Main'));
const Emails = lazy(() => import('../components/Emails'));
const ViewEmail = lazy(() => import('../components/ViewEmail'));


const routes = {
    login:{
        path:'/login',
        element:Login
    },
    signup:{
        path:"/signup",
        element:Signup
    },
    main: {
        path: '/',
        element: Main
    },
    emails: {
        path: '/emails',
        element: Emails
    },
    invalid: {
        path: '/*',
        element: Emails
    },
    view: {
        path: '/view',
        element: ViewEmail
    }
}

export { routes };