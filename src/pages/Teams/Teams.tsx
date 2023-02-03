import * as React from 'react';
import {ListItem, Teams as TeamsList} from 'types/types';
import {getTeams as fetchTeams} from '../../api/api';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import {GlobalContainer} from '../../components/global.styled';

const getTeamsList = (teams: TeamsList[]): ListItem[] => {
    return teams.map(team => {
        const {id, name} = team;
        var columns = [
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
        } as ListItem;
    });
};

const Teams = (): JSX.Element => {
    const [teams, setTeams] = React.useState<TeamsList[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const getTeams = async () => {
            const response = await fetchTeams();
            setTeams(response);
            setIsLoading(false);
        };
        
        getTeams();
    }, []);

    return (
        <GlobalContainer>
            <Header title="Teams" showBackButton={false} />
            <List items={getTeamsList(teams)} isLoading={isLoading} />
        </GlobalContainer>
    );
};

export default Teams;
