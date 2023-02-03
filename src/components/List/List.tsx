import * as React from 'react';
import {ListItem} from 'types/types';
import Card from '../Card/Card';
import {Spinner} from '../Spinner/Spinner';
import {ListContainer} from './List.styled';

interface ListProps {
    items: ListItem[];
    hasNavigation?: boolean;
    isLoading: boolean;
}

const List = (props: ListProps): JSX.Element => {
    const {items, hasNavigation = true, isLoading} = props;

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
                        />
                    )
                )}
        </ListContainer>
    );
};

export default List;
