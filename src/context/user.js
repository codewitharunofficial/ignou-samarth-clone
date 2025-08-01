const { createContext, useState, useContext } = require("react");

const UserContext = createContext();

const User = ({ children }) => {

    const [user, setUser] = useState({});
    return (
        <UserContext.Provider value={[user, setUser]} >
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext);

export { useUser, User };