import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FourOFourPage: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }, []);

    return <div>
        <h1>ERROR 404</h1>
        <h4>redirecting to home page</h4>
    </div>;
};
export default FourOFourPage;
