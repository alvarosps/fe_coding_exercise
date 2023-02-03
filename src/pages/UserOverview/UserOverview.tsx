import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { UserData } from 'types/types';
import Card from '../../components/Card/Card';
import { GlobalContainer } from '../../components/global.styled';
import Header from '../../components/Header/Header';

var mapU = (user: UserData) => {
    var columns = [
        {
            key: 'Name',
            value: `${user.firstName} ${user.lastName}`,
        },
        {
            key: 'Display Name',
            value: user.displayName,
        },
        {
            key: 'Location',
            value: user.location,
        },
    ];
    return <Card columns={columns} hasNavigation={false} navigationProps={user} />;
};

const UserOverview = () => {
    const location = useLocation();
    return (
        <GlobalContainer>
            <Header
                title={`User ${location.state.firstName} ${location.state.lastName}`}
            />
            {mapU(location.state)}
        </GlobalContainer>
    );
};

export default UserOverview;
