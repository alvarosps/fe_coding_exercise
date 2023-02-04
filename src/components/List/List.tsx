import * as React from 'react';
import {ListItemType} from 'types/types';
import Card from '../Card/Card';
import {Spinner} from '../Spinner/Spinner';
import {ListContainer} from './List.styled';

interface ListProps {
    items: ListItemType[];
    hasNavigation?: boolean;
    isLoading: boolean;
    isUser?: boolean;
}

const List = (props: ListProps): JSX.Element => {
    const {items, hasNavigation = true, isLoading, isUser = false} = props;

    return (
        <ListContainer>
            {isLoading && <Spinner />}
            {!isLoading &&
                items.map(({url, id, columns, navigationProps}, index) => (
                        <Card
                            key={`${id}-${index}`}
                            id={id}
                            columns={columns}
                            navigationProps={navigationProps}
                            hasNavigation={hasNavigation}
                            url={url}
                            isUser={isUser}
                        />
                    )
                )}
        </ListContainer>
    );
};

export default List;
