import * as React from 'react';
import {ListItemType} from 'types/types';
import Card from '../Card/Card';
import {Spinner} from '../Spinner/Spinner';
import {ItemsPerPage, ListContainer, PageNumber, PageSelect, PaginationContainer} from './List.styled';

interface ListProps {
    items: ListItemType[];
    hasNavigation?: boolean;
    isLoading: boolean;
    isUser?: boolean;
    itemsPerPage?: number;
    usePagination?: boolean;
}

const List = (props: ListProps): JSX.Element => {
    const {
        items,
        hasNavigation = true,
        isLoading,
        isUser = false,
        itemsPerPage = 20,
        usePagination = false,
    } = props;

    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPageState, setItemsPerPageState] = React.useState(itemsPerPage);
    const totalPages = Math.ceil(items.length / itemsPerPageState);
    const startIndex = (currentPage - 1)*itemsPerPageState;
    const endIndex = startIndex + itemsPerPageState;

    const possibleAvailableItems = Array.from({length: 9}, (_, i) => i * 5);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPageState(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    const itemsToMap = usePagination ? items.slice(startIndex, endIndex) : items;

    return (
        <React.Fragment>
            <ListContainer isUser={isUser}>
                {isLoading && <Spinner />}
                {!isLoading &&
                    itemsToMap.map(({url, id, columns, navigationProps}, index) => (
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
            {!isLoading && usePagination && (
                <React.Fragment>
                    <PaginationContainer>
                        {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                            <PageNumber
                                key={page}
                                active={page === currentPage}
                                onClick={() => handlePageClick(page)}
                            >
                                {page}
                            </PageNumber>
                        ))}
                    </PaginationContainer>
                    <ItemsPerPage>
                        Items per page:
                        <PageSelect
                            data-testid='list-select'
                            value={itemsPerPageState}
                            onChange={handleItemsPerPageChange}
                        >
                            {possibleAvailableItems.map((item, index) => (
                                <option key={`option-${index}`} value={item}>{item}</option>
                            ))}
                        </PageSelect>
                    </ItemsPerPage>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default List;
