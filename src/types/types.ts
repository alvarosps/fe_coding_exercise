import {Path} from 'react-router-dom';

export interface Location<T> extends Path {
    state: T;
}

export type TeamsType = {
    id: string;
    name: string;
}

export type TeamOverviewType = {
    id: string;
    teamLeadId: string;
    teamMemberIds: string[];
}

export type UserDataType = {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    location: string;
    avatar: string;
}

export type ListItemColumnType = {
    key: string;
    value: string;
}

export type ListItemType = {
    id: string;
    url?: string;
    columns: Array<ListItemColumnType>;
    navigationProps?: UserDataType | TeamsType;
}
