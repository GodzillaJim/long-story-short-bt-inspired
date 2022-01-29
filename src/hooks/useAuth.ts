import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../redux/combineReducers';

const useAuth = <T>() => {
    const { authToken, user, isAdmin } = useSelector((state: RootState)=> state.auth)
    const navigate = useNavigate()
    useEffect(()=> {
        if(authToken === ""){
            navigate("/login")
        }
    }, [authToken, navigate])
    return { authToken, user, isAdmin };
};

export default useAuth;
