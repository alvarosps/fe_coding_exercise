import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {ListItemColumnType, TeamsType, UserDataType} from 'types/types';
import {
    CardBody,
    CardBodyContent,
    CardContainer,
    CardAvatar,
    CardLeader,
    CardText,
    CardTitle,
} from './Card.styled';

interface CardProps {
    id: string;
    url?: string;
    columns: ListItemColumnType[];
    hasNavigation?: boolean;
    navigationProps?: UserDataType | TeamsType;
    isUser?: boolean;
    isLeader?: boolean;
}

const Card = (props: CardProps): JSX.Element => {
    const {
        id,
        columns,
        url = '',
        hasNavigation = true,
        navigationProps = null,
        isUser = false,
        isLeader = false,
    } = props;

    const navigate = useNavigate();

    const handleOnClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();

        if (hasNavigation) {
            navigate(url, {
                state: navigationProps,
            });
        }
    };

    const name = columns.find(col => col.key === 'name')?.value;
    const displayName = columns.find(col => col.key === 'displayName')?.value;
    const userLocation = columns.find(col => col.key === 'location')?.value;
    const avatarUrl = columns.find(col => col.key === 'avatarUrl')?.value;

    return (
        <CardContainer
            data-testid="cardContainer"
            hasNavigation={hasNavigation}
            onClick={handleOnClick}
            isUser={isUser}
            isLeader={isLeader}
        >
            {isLeader && <CardLeader data-testid="card-leader">Team Leader</CardLeader>}
            <CardAvatar showAvatar={isUser} data-testid="card-avatar">
                <img src={avatarUrl} alt="avatar" />
            </CardAvatar>
            <CardBody>
                <CardBodyContent>
                    <CardTitle data-testid={`card-name-${id}`}>{name}</CardTitle>
                    {isUser && (
                        <React.Fragment>
                            <CardText data-testid="card-display-name">
                                Display Name: {displayName}
                            </CardText>
                            <CardText data-testid="card-location">
                                Location: {userLocation}
                            </CardText>
                        </React.Fragment>
                    )}
                </CardBodyContent>
            </CardBody>
        </CardContainer>
    );
};

export default Card;
