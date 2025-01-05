import React, { useEffect, useState } from 'react';
import { getActivities, deleteActivity } from '../services/api';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const HomePage = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token, tokenTimestamp, logout } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        // Token süresinin dolup dolmadığını kontrol ediyoruz
        if (tokenTimestamp) {
            const tokenAge = new Date().getTime() - tokenTimestamp;  // Token'ın alındığı zaman ile şu anki zaman arasındaki fark
            const tokenValidityPeriod = 12 * 60 * 60 * 1000;  // 12 saat (milisaniye cinsinden)

            if (tokenAge > tokenValidityPeriod) {
                logout();  // Token süresi dolmuşsa, kullanıcıyı çıkartıyoruz
                navigate('/login');  // Login sayfasına yönlendiriyoruz
                return;  // Daha fazla işlem yapma
            }
        }

        const fetchActivities = async () => {
            try {
                const data = await getActivities(token);
                setActivities(data);
                setLoading(false);
            } catch (err) {
                setError('Etkinlikleri yüklerken bir hata oluştu, lütfen giriş yapınız');
                setLoading(false);
            }
        };

        if (token) {
            fetchActivities();
        } else {
            navigate('/login');  // Token yoksa login sayfasına yönlendiriyoruz
        }
    }, [token, tokenTimestamp, logout, navigate]);

    const handleDeleteActivity = async (activityId) => {
        try {
            await deleteActivity(token, activityId);
            setActivities(activities.filter((activity) => activity._id !== activityId));
        } catch (err) {
            setError('Etkinlik silinirken bir hata oluştu');
        }
    };

    const handleCreateEvent = () => {
        navigate('/create-event');
    };

    if (loading) {
        return (
            <div className="container text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h3>Yükleniyor...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container text-center">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Etkinlikler</h2>
            <div className="row">
                {activities.map((activity) => (
                    <div className="col-md-4 mb-4" key={activity._id}>
                        <div className="card shadow-sm position-relative">
                            <div className="card-body">
                                <h5 className="card-title">{activity.ad}</h5>
                                <p className="card-text">{activity.aciklama}</p>
                                <p className="card-text">
                                    <strong>Tarih:</strong> {moment(activity.tarih).format('LL')}
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/event/${activity._id}`)}
                                >
                                    Etkinliği Görüntüle
                                </button>

                                <button
                                    className="btn btn-danger btn-sm text-white border border-danger position-absolute top-0 end-0 m-2"
                                    onClick={() => handleDeleteActivity(activity._id)}
                                    style={{ zIndex: 10 }}
                                >
                                    X
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="btn btn-success position-fixed bottom-0 end-0 m-4"
                onClick={handleCreateEvent}
                style={{ zIndex: 10 }}
            >
                Etkinlik Oluştur
            </button>
        </div>
    );
};

export default HomePage;
