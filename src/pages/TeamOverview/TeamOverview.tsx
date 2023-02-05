import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItemType, Location, TeamsType, UserDataType} from 'types/types';
import {getUserColumns} from 'utils/utils';
import Search from 'components/Search/Search';
import {getTeamOverview, getUserData} from '../../services/api';
import Card from '../../components/Card/Card';
import {
    Container,
    OverviewContainer,
    OverviewHeader,
    OverviewTitle,
    SearchError,
} from '../../components/global.styled';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';

const getUsersCards = (users: UserDataType[]): ListItemType[] => {
    return users.map(user => {
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
            key: 'teamLead',
            value: '',
        },
        ...getUserColumns(teamLead),
    ];

    return (
        <Card
            id={id}
            data-testid="team-lead"
            columns={columns}
            url={`/user/${id}`}
            navigationProps={teamLead}
            isUser
            isLeader
        />
    );
};

const TeamOverview = (): JSX.Element => {
    const location: Location<TeamsType> = useLocation();
    const {teamId} = useParams();
    const [allTeamMembers, setAllTeamMembers] = React.useState<UserDataType[]>([]);
    const [filteredTeamMembers, setFilteredTeamMembers] = React.useState<UserDataType[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [searchError, setSearchError] = React.useState<boolean>(false);
    const [leadId, setLeadId] = React.useState<string>('');
    const [showTeamLead, setShowTeamLead] = React.useState<boolean>(true);

    const noMembersMessage = 'No team member exists with this search.';

    React.useEffect(() => {
        const getTeamUsers = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const teamLead = await getUserData(teamLeadId);
            setLeadId(teamLeadId);

            const teamMembers = [];
            for (const teamMemberId of teamMemberIds) {
                const data = await getUserData(teamMemberId);
                teamMembers.push(data);
            }

            setFilteredTeamMembers([teamLead, ...teamMembers]);
            setAllTeamMembers([teamLead, ...teamMembers]);
            setIsLoading(false);
        };

        getTeamUsers();
    }, [teamId]);

    React.useEffect(() => {
        const checkAndUpdateData = () => {
            if (filteredTeamMembers.length === 0) {
                setFilteredTeamMembers(allTeamMembers);
            } else {
                const leadIndex = filteredTeamMembers.findIndex(member => member.id === leadId);
                setShowTeamLead(leadIndex !== -1);
            }
        };

        checkAndUpdateData();
    }, [filteredTeamMembers, allTeamMembers, leadId]);

    return (
        <Container>
            <Header title="Team" />
            <OverviewHeader>
                <OverviewTitle>{location.state.name}</OverviewTitle>
                <Search
                    originalObject={allTeamMembers}
                    updateFilteredObject={setFilteredTeamMembers}
                    placeholder="Search by name"
                    searchProps={['firstName', 'lastName']}
                    notifyError={setSearchError}
                />
            </OverviewHeader>
            <OverviewContainer style={{marginTop: '120px'}}>
                {searchError && <SearchError>{noMembersMessage}</SearchError>}
                {!searchError && (
                    <React.Fragment>
                        {!isLoading && showTeamLead && getTeamLeadCard(allTeamMembers[0])}
                        <List
                            data-testid="team-overview"
                            isLoading={isLoading}
                            items={getUsersCards(
                                filteredTeamMembers.filter(member => member.id !== leadId) ?? []
                            )}
                            isUser
                        />
                    </React.Fragment>
                )}
            </OverviewContainer>
        </Container>
    );
};

export default TeamOverview;
