import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {ListItemType} from 'types/types';
import List from '../List';

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => jest.fn(),
}));

const generateItem = (index: number) => {
    return {
        id: index.toString(),
        columns: [
            {
                key: 'name',
                value: `test-${index}`,
            },
        ],
    };
};

const testPaginationItems: ListItemType[] = Array.from({length: 100}, (_, i) => generateItem(i));

describe('List', () => {

    it('should render spinner and not render items when it is loading', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'name',
                        value: 'columnValue1',
                    },
                ],
            },
        ];
        render(<List isLoading items={items} />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        expect(screen.queryByTestId('cardContainer')).not.toBeInTheDocument();
    });

    it('should not render spinner and render items when it is not loading', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'name',
                        value: 'columnValue1',
                    },
                ],
            },
        ];
        render(<List isLoading={false} items={items} />);

        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(screen.getByTestId('card-name-1')).toBeInTheDocument();
    });

    it('should render multiple card when multiple items', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'name',
                        value: 'columnValue1',
                    },
                ],
            },
            {
                id: '2',
                columns: [
                    {
                        key: 'displayName',
                        value: 'columnValue2',
                    },
                ],
            },
        ];
        render(<List isLoading={false} items={items} isUser />);

        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(screen.getByTestId('card-name-1')).toBeInTheDocument();
        expect(screen.getByTestId('card-name-1')).toBeInTheDocument();
    });

    it('renders the correct number of cards', () => {
        render(<List items={testPaginationItems} isLoading={false} usePagination />);

        expect(screen.getByText('test-0')).toBeInTheDocument();
        expect(screen.getByText('test-19')).toBeInTheDocument();
        expect(screen.getAllByTestId('cardContainer')).toHaveLength(20);
    });

    it('renders the correct cards based on current page', () => {
        render(<List items={testPaginationItems} isLoading={false} usePagination />);
        expect(screen.queryByTestId('card-name-25')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('2'));
        expect(screen.getByTestId('card-name-25')).toBeInTheDocument();
    });

    it('changes the number of items per page', () => {
        render(<List items={testPaginationItems} isLoading={false} usePagination />);

        expect(screen.queryAllByTestId('cardContainer')).toHaveLength(20);

        fireEvent.change(screen.getByTestId('list-select'), {
            target: {
                value: '30',
            },
        });

        expect(screen.queryAllByTestId('cardContainer')).toHaveLength(30);
    });
});
