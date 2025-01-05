import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { createEvent } from '../services/api';

const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { token } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!eventName || !eventDate || !eventDescription) {
            setError("Tüm alanlar zorunludur!");
            return;
        }

        try {

            await createEvent(token, {
                ad: eventName,
                tarih: eventDate,
                aciklama: eventDescription
            });


            navigate('/');
        } catch (err) {
            setError('Etkinlik oluşturulurken bir hata oluştu.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="text-center mb-4">Yeni Etkinlik Oluştur</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="eventName" className="form-label">Etkinlik Adı</label>
                        <input
                            type="text"
                            className="form-control"
                            id="eventName"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="eventDate" className="form-label">Etkinlik Tarihi</label>
                        <input
                            type="date"
                            className="form-control"
                            id="eventDate"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="eventDescription" className="form-label">Etkinlik Açıklaması</label>
                        <textarea
                            className="form-control"
                            id="eventDescription"
                            rows="4"
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Etkinlik Oluştur</button>
                    </div>
                </form>

                <hr />

            </div>
        </div>
    );
};

export default CreateEvent;
