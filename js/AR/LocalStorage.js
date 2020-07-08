/*
    wrapper around local storage for react native
*/

import { AsyncStorage } from 'react-native';

class LocalStorage {
    async storeDataAsync(key, data) {
        try {
            const type = typeof data;
            
            // react native async storage requires all values to be strings
            let asString = (type === "object") ? JSON.stringify(data) : String(data);

            // store the original type in the value, 
            // so we can cast it back when retreiving the value
            asString += '::' + type;

            await AsyncStorage.setItem(key, asString);
        }
        catch(e) {
            console.error("Error saving data to local storage:", e);
        }
    }
    async retreiveDataAsync(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value === null) {
                console.warn("No Local Storage Value for Key: " + key);
                return value;
            }

            // get the original data type and cast back to that datatype before
            // returning the value
            const split = value.split("::");
            const dataType = split[1];
            const asString = split[0];

            if (dataType === "object") {
                return JSON.parse(asString);
            }
            else if (dataType === "number") {
                return Number(asString);
            }
            else if (dataType === "boolean") {
                return Boolean(asString)
            }
            return asString;
        } 
        catch (e) {
            console.error("Error loading data from local storage:", e);
        }
    }
}

const localStorageInstance = new LocalStorage();

module.exports = localStorageInstance