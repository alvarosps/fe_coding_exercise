import * as React from 'react';
import {ListItemType, TeamsType} from 'types/types';
import Search from 'components/Search/Search';
import {getTeams} from '../../services/api';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import {Container, OverviewContainer, SearchError} from '../../components/global.styled';

const getTeamsList = (teams: TeamsType[]): ListItemType[] => {
    return teams.map(team => {
        const {id, name} = team;
        const columns = [
            {
                key: 'name',
                value: name,
            },
        ];
        return {
            id,
            url: `/team/${id}`,
            columns,
            navigationProps: team,
        } as ListItemType;
    });
};

const Teams = (): JSX.Element => {
    const [teams, setTeams] = React.useState<TeamsType[]>([]);
    const [filteredTeams, setFilteredTeams] = React.useState<TeamsType[]>([]);
    const [searchError, setSearchError] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const noTeamsMessage = 'No teams were found with this search.';

    React.useEffect(() => {
        const fetchTeams = async () => {
            const response = await getTeams();
            setTeams(response);
            setFilteredTeams(response);
            setIsLoading(false);
        };
        
        fetchTeams();
    }, []);

    React.useEffect(() => {
        if (filteredTeams.length === 0) {
            setFilteredTeams(teams);
        }
    }, [filteredTeams, teams]);

    const searchStyleForTeams = {
        width: '25%',
    };

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <OverviewContainer>
                <Search
                    originalObject={teams}
                    updateFilteredObject={setFilteredTeams}
                    notifyError={setSearchError}
                    placeholder='Search by team name'
                    searchProps={['name']}
                    style={searchStyleForTeams}
                    fixOnHeader
                />
                {!searchError && (
                    <List
                        data-testid='teams-list'
                        items={getTeamsList(filteredTeams)}
                        isLoading={isLoading}
                        usePagination
                    />
                )}
                {searchError && <SearchError>{noTeamsMessage}</SearchError>}
            </OverviewContainer>
        </Container>
    );
};

export default Teams;
