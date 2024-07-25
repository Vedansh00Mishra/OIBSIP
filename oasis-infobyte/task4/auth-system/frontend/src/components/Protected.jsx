import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Protected() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/auth/me', {
                    headers: {
                        'x-auth-token': token
                    }
                });
                setMessage(res.data.message);
            } catch (err) {
                console.error(err);
                navigate('/login');
            }
        };
        fetchData();
    }, [navigate]);

    return (
        <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-6">{message}</h2>
        </div>
    );
}

export default Protected;
