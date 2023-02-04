import * as React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import * as API from '../../../services/api';
import TeamOverview from '../TeamOverview';
import { TeamOverviewType, UserDataType } from 'types/types';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            id: '1',
            name: 'Some Team',
        },
    }),
    useNavigate: () => jest.fn(),
    useParams: () => ({
        teamId: '1',
    }),
}));

describe('TeamOverview', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render team overview users', async () => {
        const teamOverview: TeamOverviewType = {
            id: '1',
            teamLeadId: '2',
            teamMemberIds: ['3', '4', '5'],
        };
        const userData: UserDataType = {
            id: '2',
            firstName: 'userData',
            lastName: 'userData',
            displayName: 'userData',
            location: '',
            avatar: '',
        };
        jest.spyOn(API, 'getTeamOverview').mockImplementationOnce(() => Promise.resolve(teamOverview));
        jest.spyOn(API, 'getUserData').mockImplementation(() => Promise.resolve(userData));

        render(<TeamOverview />);
        
        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(4);
        });
    });
});
