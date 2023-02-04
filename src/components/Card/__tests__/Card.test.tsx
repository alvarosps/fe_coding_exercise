import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {TeamsType} from 'types/types';
import Card from '../Card';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('Card', () => {
    it('should render card with team data', () => {
        const id = 'test-id';
        const columns = [{key: 'name', value: 'columnValue'}];
        render(<Card id={id} columns={columns} />);


        expect(screen.getByTestId('card-name')).toBeInTheDocument();
    });

    it('should render card with user data', () => {
        const id = 'test-id';
        var columns = [
            {key: 'name', value: 'columnValue1'},
            {key: 'displayName', value: 'columnValue2'},
            {key: 'location', value: 'columnValue3'},
            {key: 'avatarUrl', value: ''},
        ];
        render(<Card id={id} columns={columns} isUser />);

        expect(screen.getByTestId('card-name')).toBeInTheDocument();
        expect(screen.getByTestId('card-display-name')).toBeInTheDocument();
        expect(screen.getByTestId('card-location')).toBeInTheDocument();
        expect(screen.getByTestId('card-avatar')).toBeInTheDocument();
    });

    it('should navigate when card is clicked and navigation is enabled', () => {
        const navProps = {
            id: '1',
            name: 'Team 1',
        } as TeamsType;

        render(
            <Card
                id={navProps.id}
                columns={[{key: 'name', value: 'columnValue'}]}
                url="path"
                navigationProps={navProps}
            />
        );

        fireEvent.click(screen.getByText('columnValue'));

        expect(mockUseNavigate).toHaveBeenCalledWith('path', {state: navProps});
    });

    it('should not navigate when card is clicked and navigation is disabled', () => {
        const id = 'test-id';

        render(<Card id={id} columns={[{key: 'name', value: 'columnValue'}]} hasNavigation={false} />);

        fireEvent.click(screen.getByText('columnValue'));

        expect(mockUseNavigate).not.toHaveBeenCalled();
    });
});
