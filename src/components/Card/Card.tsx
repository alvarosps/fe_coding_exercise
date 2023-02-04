import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {ListItemColumnType, TeamsType, UserDataType} from 'types/types';
import {CardContainer} from './Card.styled';

interface CardProps {
    id: string;
    url?: string;
    columns: ListItemColumnType[];
    hasNavigation?: boolean;
    navigationProps?: UserDataType | TeamsType;
}

const Card = (props: CardProps): JSX.Element => {
    const {
        id,
        columns,
        url =  '',
        hasNavigation = true,
        navigationProps = null,
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
        >
            {
                columns.map(({key: columnKey, value}, index) => (
                    <p data-testid='card-column' key={`${columnKey}-${index}`}>
                        <strong>{columnKey}</strong>&nbsp;{value}
                    </p>
                ))
            }
        </CardContainer>
    );
};

export default Card;
