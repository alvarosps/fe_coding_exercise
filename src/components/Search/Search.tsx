import * as React from 'react';
import {TeamsType, UserDataType} from 'types/types';
import {SearchInput} from './Search.styled';

interface SearchProps<ObjectType> {
    originalObject: ObjectType[];
    updateFilteredObject: (updatedObject: ObjectType[]) => void;
    notifyError: (hasError: boolean) => void;
    searchProps: string[];
    placeholder: string;
}

const Search = <ObjectType extends TeamsType | UserDataType>(props: SearchProps<ObjectType>): JSX.Element => {
    const {originalObject, updateFilteredObject, notifyError, searchProps, placeholder} = props;

    const [searchValue, setSearchValue] = React.useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value);

    React.useEffect(() => {
        if (searchValue !== '') {
            const filteredObject = originalObject.filter((obj) => {
                let includes = false;
                searchProps.forEach((prop) => {
                    if (obj[prop] && obj[prop].toLowerCase().includes(searchValue)) {
                        includes = true;
                    }
                });
                return includes;
            });
            if (filteredObject.length === 0) {
                notifyError(true);
                updateFilteredObject([]);
            } else {
                updateFilteredObject(filteredObject);
                notifyError(false);
            }
        } else {
            updateFilteredObject(originalObject);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, notifyError]);

    return (
        <SearchInput type='text' value={searchValue} onChange={handleChange} placeholder={placeholder}/>
    );
};

export default Search;