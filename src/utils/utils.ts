import {ListItemColumn, UserData} from 'types/types';

export const getUserColumns = (user: UserData): ListItemColumn[] => {
    const {firstName, lastName, displayName, location} = user;

    return [
        {
            key: 'Name',
            value: `${firstName} ${lastName}`,
        },
        {
            key: 'Display Name',
            value: displayName,
        },
        {
            key: 'Location',
            value: location,
        },
    ];
};