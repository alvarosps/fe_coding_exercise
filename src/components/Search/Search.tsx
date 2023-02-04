import * as React from 'react';
import {TeamsType, UserDataType} from 'types/types';

interface SearchProps<ObjectType> {
    object: ObjectType[];
    updateObject: (object: ObjectType[]) => void;
    notifyError: (hasError: boolean) => void;
    searchProp: string;
    placeholder: string;
}

const Search = <ObjectType extends TeamsType | UserDataType>(props: SearchProps<ObjectType>): JSX.Element => {
    const {object, updateObject, notifyError, searchProp, placeholder} = props;

    const [searchValue, setValue] = React.useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    React.useEffect(() => {
        if (searchValue !== '') {
            const filteredObject = object.filter((obj) => obj[searchProp].toLowerCase().includes(searchValue));
            if (filteredObject.length === 0) {
                notifyError(true);
                updateObject([]);
            } else {
                updateObject(filteredObject);
                notifyError(false);
            }
        } else {
            updateObject(object);
        }
    }, [searchValue, notifyError, object, searchProp, updateObject]);

    return (
        <input type='text' value={searchValue} onChange={handleChange} placeholder={placeholder}/>
    );
};

export default Search;