import * as React from 'react';
import {ListItemType, TeamsType} from 'types/types';
import {getTeams} from '../../services/api';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import {Container} from '../../components/global.styled';

const getTeamsList = (teams: TeamsType[]): ListItemType[] => {
    return teams.map(team => {
        const {id, name} = team;
        const columns = [
            {
                key: 'Name',
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
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const fetchTeams = async () => {
            const response = await getTeams();
            setTeams(response);
            setIsLoading(false);
        };
        
        fetchTeams();
    }, []);

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List data-testid="teams-list" items={getTeamsList(teams)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
