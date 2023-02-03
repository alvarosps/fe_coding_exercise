import * as React from 'react';
import { ListItem, Teams as TeamsList } from 'types/types';
import { getTeams as fetchTeams } from '../../api/api';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import { GlobalContainer } from '../../components/global.styled';

var MapT = (teams: TeamsList[]) => {
    return teams.map(team => {
        var columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        } as ListItem;
    });
};

const Teams = (): JSX.Element => {
    const [teams, setTeams] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState<any>(true);

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
            <List items={MapT(teams)} isLoading={isLoading} />
        </GlobalContainer>
    );
};

export default Teams;
