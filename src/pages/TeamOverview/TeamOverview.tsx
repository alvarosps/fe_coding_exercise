import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types/types';
import {getUserColumns} from 'utils/utils';
import {getTeamOverview, getUserData} from '../../api/api';
import Card from '../../components/Card/Card';
import {GlobalContainer} from '../../components/global.styled';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';

const getUsersCards = (users: UserData[]): ListItem[] => {
    return users.map((user) => {
        var columns = getUserColumns(user);
        
        return {
            id: user.id,
            url: `/user/${user.id}`,
            columns,
            navigationProps: user,
        };
    }) as ListItem[];
};

const getTeamLeadCard = (teamLead: UserData): JSX.Element => {
    const {id} = teamLead;

    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        ...getUserColumns(teamLead),
    ];

    return <Card id={id} columns={columns} url={`/user/${id}`} navigationProps={teamLead} />;
};

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const TeamOverview = (): JSX.Element => {
    const location = useLocation();
    const {teamId} = useParams();
    const [pageData, setPageData] = React.useState<PageState>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const getTeamUsers = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const teamLead = await getUserData(teamLeadId);

            const teamMembers = [];
            for(const teamMemberId of teamMemberIds) {
                const data = await getUserData(teamMemberId);
                teamMembers.push(data);
            }
            setPageData({
                teamLead,
                teamMembers,
            });
            setIsLoading(false);
        };

        getTeamUsers();
    }, [teamId]);

    return (
        <GlobalContainer>
            <Header title={`Team ${location.state.name}`} />
            {!isLoading && getTeamLeadCard(pageData.teamLead)}
            <List isLoading={isLoading} items={getUsersCards(pageData?.teamMembers ?? [])} />
        </GlobalContainer>
    );
};

export default TeamOverview;
