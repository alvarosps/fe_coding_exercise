import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItemColumn, Teams, UserData } from 'types/types';
import { CardContainer } from './Card.styled';

interface CardProps {
    id: string;
    url?: string;
    columns: ListItemColumn[];
    hasNavigation?: boolean;
    navigationProps?: UserData | Teams;
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
                state: navigationProps
            });
        }
    }

    return (
        <CardContainer
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={handleOnClick}
        >
            {
                columns.map(({ key: columnKey, value }) => (
                    <p key={columnKey}>
                        <strong>{columnKey}</strong>&nbsp;{value}
                    </p>
                ))
            }
        </CardContainer>
    );
};

export default Card;
