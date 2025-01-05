import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActivityDetail, updateActivity } from '../services/api';
import { useUser } from '../context/UserContext';

const EditEventPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [updatedEvent, setUpdatedEvent] = useState({
        ad: '',
        aciklama: '',
        tarih: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token } = useUser();
    const navigate = useNavigate();

    // Etkinlik verilerini yükle
    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const data = await getActivityDetail(eventId, token);
                setEvent(data);
                const formattedDate = new Date(data.tarih).toISOString().slice(0, 16);
                setUpdatedEvent({
                    id: eventId,
                    ad: data.ad,
                    aciklama: data.aciklama,
                    tarih: formattedDate,
                });
            } catch (err) {
                setError('Etkinlik bilgileri yüklenirken bir hata oluştu');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId, token]); // eventId ve token değiştiğinde yeniden veri çekilecek

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEvent((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            await updateActivity(token, updatedEvent);  // Etkinlik güncelleme API çağrısı
            navigate(`/event/${eventId}`);  // Düzenleme işleminden sonra etkinlik detay sayfasına yönlendir
        } catch (error) {
            setLoading(false);
            setError('Etkinlik güncellenirken bir hata oluştu');
        }
    };

    if (loading) return <div>Yükleniyor...</div>;

    if (!event) return <div>Etkinlik bulunamadı.</div>;

    return (
        <div className="container py-5">
            <div className="edit-event-container bg-white shadow-sm rounded p-4">
                <h2 className="text-center mb-4">Etkinlik Düzenle</h2>

                {error && <div className="alert alert-danger text-center">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="ad" className="form-label">
                            Etkinlik Adı
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="ad"
                            name="ad"
                            value={updatedEvent.ad}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="aciklama" className="form-label">
                            Açıklama
                        </label>
                        <textarea
                            className="form-control"
                            id="aciklama"
                            name="aciklama"
                            rows="4"
                            value={updatedEvent.aciklama}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tarih" className="form-label">
                            Etkinlik Tarihi
                        </label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="tarih"
                            name="tarih"
                            value={updatedEvent.tarih}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? 'Güncelleniyor...' : 'Etkinliği Güncelle'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEventPage;
