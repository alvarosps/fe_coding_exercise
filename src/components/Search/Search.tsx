import * as React from 'react';
import {TeamsType, UserDataType} from 'types/types';

interface SearchProps<ObjectType> {
    originalObject: ObjectType[];
    updateFilteredObject: (updatedObject: ObjectType[]) => void;
    notifyError: (hasError: boolean) => void;
    searchProp: string;
    placeholder: string;
}

const Search = <ObjectType extends TeamsType | UserDataType>(props: SearchProps<ObjectType>): JSX.Element => {
    const {originalObject, updateFilteredObject, notifyError, searchProp, placeholder} = props;

    const [searchValue, setValue] = React.useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    React.useEffect(() => {
        if (searchValue !== '') {
            const filteredObject = originalObject.filter((obj) => obj[searchProp].toLowerCase().includes(searchValue));
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
    }, [searchValue, notifyError, originalObject, searchProp, updateFilteredObject]);

    return (
        <input type='text' value={searchValue} onChange={handleChange} placeholder={placeholder}/>
    );
};

export default Search;