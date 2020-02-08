import  React, { useContext, useEffect, useState } from 'react';

const UserContext = React.createContext([undefined, undefined]);

function UserProvider ({ children }) {
    /************************************
    * State
    ************************************/

    const [user, setUser] = useState(null);

    /************************************
    * Life Cycle Hooks
    ************************************/

    useEffect(() => {
        //TODO Jacob J: Don't use localStorage, very unsecure
        const sessionUser = JSON.parse(window.localStorage.getItem('user'));
        if (sessionUser && !user) {
            setUser(sessionUser);
        }
    }, [user]);

    useEffect(() => {
        window.localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

/************************************
* Custom Hooks
************************************/

/**
 * Gives the current user and a function to set the user
 * 
 * @returns {Array} [user, setUser]
 */
function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('User must be accessed from within the UserProvider');
    }

    return context;
}

export {
    UserProvider,
    useUser
};
