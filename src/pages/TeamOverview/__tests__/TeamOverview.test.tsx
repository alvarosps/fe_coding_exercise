import * as React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {TeamOverviewType, UserDataType} from 'types/types';
import * as API from '../../../services/api';
import TeamOverview from '../TeamOverview';

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

const getUserData = (id) => {
    const userData: UserDataType = {
        id,
        firstName: 'userData',
        lastName: 'userData',
        displayName: 'userData',
        location: '',
        avatar: '',
    };

    return userData;
};

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
        const teamLeadData = getUserData('2');
        const teamMembersData = [
            getUserData('3'),
            getUserData('4'),
            getUserData('5'),
        ];
        jest.spyOn(API, 'getTeamOverview').mockImplementationOnce(() => Promise.resolve(teamOverview));
        jest.spyOn(API, 'getUserData')
            .mockImplementationOnce(() => Promise.resolve(teamLeadData))
            .mockImplementationOnce(() => Promise.resolve(teamMembersData[0]))
            .mockImplementationOnce(() => Promise.resolve(teamMembersData[1]))
            .mockImplementationOnce(() => Promise.resolve(teamMembersData[2]));

        render(<TeamOverview />);
        
        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(4);
        });
    });
});
