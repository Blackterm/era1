import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { login as loginAction, getUserInfo } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await loginAction(email, password);
            const { bearer } = response;


            const decodedToken = jwtDecode(bearer);
            const userId = decodedToken?.data?.id;


            const userInfo = await getUserInfo(bearer, userId);


            login(userInfo, bearer);


            navigate('/');
        } catch (err) {
            setError(err?.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Login</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>

                <hr />
                <div className="text-center">
                    <p>Don't have an account? <a href="/register" className="text-decoration-none">Register</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
