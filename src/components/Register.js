import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerAction } from '../services/api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerAction({
                email,
                password,
                birthDate,
                gender,
                name,
                lastName,
                phone
            });


            navigate('/login');
        } catch (err) {
            setError(err?.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="text-center mb-4">Register</h2>

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

                    <div className="mb-3">
                        <label htmlFor="birthDate" className="form-label">Birth Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="birthDate"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <select
                            className="form-control"
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Cinsiyetiniz</option>
                            <option value="male">Erkek</option>
                            <option value="female">Kadın</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>

                <hr />
                <div className="text-center">
                    <p>Already have an account? <a href="/login" className="text-decoration-none">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
