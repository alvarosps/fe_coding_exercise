import * as React from 'react';
import {TeamsType, UserDataType} from 'types/types';
import {SearchContainer, SearchInput} from './Search.styled';

interface SearchProps<ObjectType> {
    originalObject: ObjectType[];
    updateFilteredObject: (updatedObject: ObjectType[]) => void;
    notifyError: (hasError: boolean) => void;
    searchProps: (keyof ObjectType)[];
    placeholder: string;
}

const Search = <ObjectType extends TeamsType | UserDataType>(props: SearchProps<ObjectType>): JSX.Element => {
    const {originalObject, updateFilteredObject, notifyError, searchProps, placeholder} = props;

    const [searchValue, setSearchValue] = React.useState<string>('');

    const handleSearch = React.useCallback(
        (value: string) => {
            try {
                const filteredObject = originalObject.filter(item => searchProps.some(prop => {
                    return item[prop].toString().toLowerCase().indexOf(value.toLowerCase()) !== -1;
                }));

                if (filteredObject.length > 0) {
                    updateFilteredObject(filteredObject);
                    notifyError(false);
                } else {
                    notifyError(true);
                }                
            } catch (error) {
                notifyError(true);
            }
        },
        [originalObject, searchProps, updateFilteredObject, notifyError]
    );

    const memoizedHandleSearch = React.useMemo(() => handleSearch, [handleSearch]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        memoizedHandleSearch(event.target.value);
    };

    return (
        <SearchContainer>
            <SearchInput type='text' value={searchValue} onChange={handleInputChange} placeholder={placeholder}/>
        </SearchContainer>
    );
};

export default Search;