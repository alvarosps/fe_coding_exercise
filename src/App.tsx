import * as React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import TeamOverview from './pages/TeamOverview/TeamOverview';
import Teams from './pages/Teams/Teams';
import UserOverview from './pages/UserOverview/UserOverview';

const App = (): JSX.Element => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Teams />,
        },
        {
            path: '/team/:teamId',
            element: <TeamOverview />,
        },
        {
            path: '/user/:userId',
            element: <UserOverview />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
