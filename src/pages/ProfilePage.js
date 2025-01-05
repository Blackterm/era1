import React from 'react';
import { useUser } from '../context/UserContext';

const ProfilePage = () => {
    const { user } = useUser();

    if (!user) {
        return (
            <div className="container text-center">
                <div className="alert alert-warning">
                    Kullanıcı bilgilerine ulaşılamadı. Lütfen giriş yapınız.
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="card shadow-sm p-4">
                <h2 className="text-center mb-4">Kullanıcı Profili</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <strong>İsim:</strong> {user.name}
                    </li>
                    <li className="list-group-item">
                        <strong>Soyisim:</strong> {user.lastName}
                    </li>
                    <li className="list-group-item">
                        <strong>Email:</strong> {user.email}
                    </li>
                    <li className="list-group-item">
                        <strong>Doğum Tarihi:</strong> {user.birthDate}
                    </li>
                    <li className="list-group-item">
                        <strong>Telefon:</strong> {user.phone}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfilePage;
