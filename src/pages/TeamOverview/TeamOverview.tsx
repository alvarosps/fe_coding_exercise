import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItemType, Location, TeamsType, UserDataType} from 'types/types';
import {getUserColumns} from 'utils/utils';
import {getTeamOverview, getUserData} from '../../services/api';
import Card from '../../components/Card/Card';
import {Container} from '../../components/global.styled';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';

const getUsersCards = (users: UserDataType[]): ListItemType[] => {
    return users.map((user) => {
        const columns = getUserColumns(user);
        
        return {
            id: user.id,
            url: `/user/${user.id}`,
            columns,
            navigationProps: user,
        };
    }) as ListItemType[];
};

const getTeamLeadCard = (teamLead: UserDataType): JSX.Element => {
    const {id} = teamLead;

    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        ...getUserColumns(teamLead),
    ];

    return <Card id={id} data-testid='team-lead' columns={columns} url={`/user/${id}`} navigationProps={teamLead} />;
};

interface PageState {
    teamLead?: UserDataType;
    teamMembers?: UserDataType[];
}

const TeamOverview = (): JSX.Element => {
    const location: Location<TeamsType> = useLocation();
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
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {!isLoading && getTeamLeadCard(pageData.teamLead)}
            <List data-testid="team-overview" isLoading={isLoading} items={getUsersCards(pageData?.teamMembers ?? [])} />
        </Container>
    );
};

export default TeamOverview;
