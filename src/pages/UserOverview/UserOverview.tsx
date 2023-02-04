import * as React from 'react';
import {useLocation} from 'react-router-dom';
import {UserDataType, Location} from 'types/types';
import {getUserColumns} from 'utils/utils';
import Card from '../../components/Card/Card';
import {Container} from '../../components/global.styled';
import Header from '../../components/Header/Header';

const getUserCard = (user: UserDataType): JSX.Element => {
    const columns = getUserColumns(user);

    return <Card id={user.id} columns={columns} hasNavigation={false} navigationProps={user} />;
};

const UserOverview = (): JSX.Element => {
    const location: Location<UserDataType> = useLocation();

    return (
        <Container>
            <Header
                title={`User ${location.state.firstName} ${location.state.lastName}`}
            />
            {getUserCard(location.state)}
        </Container>
    );
};

export default UserOverview;
