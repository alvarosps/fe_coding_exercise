import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { UserData } from 'types/types';
import Card from '../../components/Card/Card';
import { GlobalContainer } from '../../components/global.styled';
import Header from '../../components/Header/Header';
import { getUserColumns } from 'utils/utils';

const getUserCard = (user: UserData) => {
    const columns = getUserColumns(user);

    return <Card id={user.id} columns={columns} hasNavigation={false} navigationProps={user} />;
};

const UserOverview = (): JSX.Element => {
    const location = useLocation();

    return (
        <GlobalContainer>
            <Header
                title={`User ${location.state.firstName} ${location.state.lastName}`}
            />
            {getUserCard(location.state)}
        </GlobalContainer>
    );
};

export default UserOverview;
