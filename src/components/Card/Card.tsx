import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {ListItemColumnType, TeamsType, UserDataType} from 'types/types';
import {CardBody, CardBodyContent, CardContainer, CardAvatar, CardLeader, CardText, CardTitle} from './Card.styled';

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
        url =  '',
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

    return (
        <CardContainer
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={handleOnClick}
            isUser={isUser}
            isLeader={isLeader}
        >
            {isLeader && <CardLeader>Team Leader</CardLeader>}
            <CardAvatar showAvatar={isUser}>
                <img src={columns.find(col => col.key === 'avatar')?.value} alt='User avatar' />
            </CardAvatar>
            <CardBody>
                <CardBodyContent>
                    <CardTitle>
                        {columns.find(col => col.key === 'name')?.value}
                    </CardTitle>
                    {isUser && (
                        <React.Fragment>
                            <CardText>
                                Display Name: {columns.find(col => col.key === 'displayName')?.value}
                            </CardText>
                            <CardText>
                                Location: {columns.find(col => col.key === 'location')?.value}
                            </CardText>
                        </React.Fragment>
                    )}
                </CardBodyContent>
            </CardBody>
        </CardContainer>
    );
};

export default Card;
