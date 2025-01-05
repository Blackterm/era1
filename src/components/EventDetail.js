import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/tr';
import { useUser } from '../context/UserContext';
import { addComment, getActivityDetail, joinEvent } from '../services/api';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

const EventDetail = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const { user, token } = useUser();
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const data = await getActivityDetail(eventId, token);
                setEvent(data);
            } catch (err) {
                setError('Etkinlik yüklenirken bir hata oluştu');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId, token]);

    if (loading) return <div>Yükleniyor...</div>;

    if (!event) return <div>Etkinlik bulunamadı.</div>;

    const handleJoinEvent = async () => {
        if (!user) {
            setError('Lütfen giriş yapın.');
            return;
        }
        const commentData = {
            etkinlikId: eventId,
            ad: user.name,
            soyad: user.lastName,
            email: user.email,
        };
        try {
            setLoading(true);
            await joinEvent(token, commentData);
            const updatedEvent = await getActivityDetail(eventId, token);
            setEvent(updatedEvent);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError('Etkinliğe katılırken bir hata oluştu.');
        }
    };

    const isJoined = event.kisiler && event.kisiler.some((person) => person.email === user?.email);

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            setError('Yorum boş olamaz!');
            return;
        }

        if (!user) {
            setError('Lütfen giriş yapın.');
            return;
        }

        const commentData = {
            id: eventId,
            yazar: user.name,
            mesaj: newComment,
        };

        setLoading(true);
        try {
            await addComment(token, commentData);
            setNewComment('');
            setError(null);

            const updatedEvent = await getActivityDetail(eventId, token);
            setEvent(updatedEvent);
        } catch (error) {
            setError('Yorum eklenirken bir hata oluştu!');
        } finally {
            setLoading(false);
        }
    };

    const handleEditEvent = () => {
        navigate(`/edit-event/${eventId}`);
    };

    return (
        <div className="container py-5">
            <div className="event-detail-container bg-white shadow-sm rounded p-4 mb-4">





                <div className="event-info-container" style={{ flex: 2, paddingLeft: '20px' }}>
                    <h2 className="text-center mb-2">{event.ad}</h2>
                    <p className="text-muted text-center mb-2">
                        <strong>Tarih:</strong> {moment(event.tarih).format('LL')}
                    </p>
                    <p className="text-center mb-2">{event.aciklama}</p>

                    <div className="d-flex justify-content-center mt-2 gap-3">
                        {isJoined ? (
                            <p className="text-success">Katıldınız!</p>
                        ) : (
                            <button className="btn btn-primary" onClick={handleJoinEvent}>
                                Etkinliğe Katıl
                            </button>
                        )}

                        <button className="btn btn-warning" onClick={handleEditEvent}>
                            Etkinliği Düzenle
                        </button>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <p>Etkinliği paylaş:</p>
                        <FacebookShareButton url={`https://your-site.com/event/${eventId}`} className="mx-2">
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={`https://your-site.com/event/${eventId}`} className="mx-2">
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <LinkedinShareButton url={`https://your-site.com/event/${eventId}`} className="mx-2">
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                    </div>
                </div>

            </div>



            {error && <div className="alert alert-danger text-center">{error}</div>}

            <div className="participants-container bg-white shadow-sm rounded p-4 mb-4">
                <h4 className="text-center mb-4">Katılımcılar</h4>
                {event.kisiler && event.kisiler.length > 0 ? (
                    <ul className="list-group">
                        {event.kisiler.map((person) => (
                            <li
                                key={person._id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div className="d-flex">
                                    <span className="fw-bold">{`${person.ad} ${person.soyad}`}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center">Bu etkinliğe henüz katılan yok.</p>
                )}
            </div>

            <div className="comments-container bg-white shadow-sm rounded p-4 mb-4">
                <h4 className="text-center mb-4">Yorumlar</h4>
                {event.yorumlar && event.yorumlar.length > 0 ? (
                    <ul className="list-group">
                        {event.yorumlar.map((comment, index) => (
                            <li key={index} className="list-group-item">
                                <div>
                                    <p><strong>{comment.yazar}</strong> - {moment(comment.tarih).format('LL LTS')}</p>
                                    <p>{comment.mesaj}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center">Bu etkinlik için henüz yorum yapılmamış.</p>
                )}
            </div>

            <div className="comment-form-container bg-white shadow-sm rounded p-4">
                <h4>Yorum Yap</h4>
                <form onSubmit={handleSubmitComment}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="3"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Yorumunuzu buraya yazın..."
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? 'Yorum Gönderiliyor...' : 'Yorum Gönder'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventDetail;
