import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Layout = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold text-primary" to="/">
                        Etkinlikler
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center">
                            {user ? (
                                <>
                                    <li className="nav-item me-3">
                                        <Link
                                            className="nav-link text-dark fw-semibold"
                                            style={{
                                                fontSize: '1.1rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                            }}
                                            to="/profile"
                                        >
                                            <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
                                            {`${user.name} ${user.lastName}`}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={handleLogout}
                                        >
                                            Çıkış Yap
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link text-primary fw-semibold" to="/login">
                                        Giriş Yap
                                    </Link>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>


            <div className="container py-4">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
