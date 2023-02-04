import {ListItemColumnType, UserDataType} from 'types/types';

export const getUserColumns = (user: UserDataType): ListItemColumnType[] => {
    const {firstName, lastName, displayName, location, avatar} = user;

    return [
        {
            key: 'name',
            value: `${firstName} ${lastName}`,
        },
        {
            key: 'displayName',
            value: displayName,
        },
        {
            key: 'location',
            value: location,
        },
        {
            key: 'avatar',
            value: avatar,
        },
    ];
};