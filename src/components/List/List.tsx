import * as React from 'react';
import { ListItem } from 'types/types';
import Card from '../Card/Card';
import { Spinner } from '../Spinner/Spinner';
import { ListContainer } from './List.styled';

interface Props {
    items?: ListItem[];
    hasNavigation?: boolean;
    isLoading: string;
}

const List = ({items, hasNavigation = true, isLoading}: Props) => {
    return (
        <ListContainer >
            {isLoading && <Spinner />}
            {!isLoading &&
                items.map(({url, id, columns, navigationProps}, index) => {
                    return (
                        <Card
                            key={`${id}-${index}`}
                            id={id}
                            columns={columns}
                            navigationProps={navigationProps}
                            hasNavigation={hasNavigation}
                            url={url}
                        />
                    );
                })}
        </ListContainer >
    );
};

export default List;
