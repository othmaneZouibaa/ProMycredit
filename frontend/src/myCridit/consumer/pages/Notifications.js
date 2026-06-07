import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markNotificationRead } from '../consumerSlice';
import SmartAlert from '../components/SmartAlert';
import { useTranslation } from 'react-i18next';

const Notifications = () => {
  const { t } = useTranslation();
  const { notifications, status } = useSelector((state) => state.consumer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationRead(id));
  };

  const isLoading = status === 'loading';

  return (
    <div className="notifications-page-modern">
      <section className="fintech-card">
        <div className="section-header">
          <h2>{t('common.notifications')}</h2>
          <span className="badge bg-primary">
            {notifications.filter(n => !n.is_read).length} {t('consumer.unread')}
          </span>
        </div>
        
        <div className="notifications-list" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isLoading && notifications.length === 0 ? (
            <div className="text-center p-5">{t('common.loading')}</div>
          ) : notifications.length > 0 ? (
            notifications.map((note) => (
              <div key={note.id} style={{ position: 'relative' }}>
                <SmartAlert notification={note} />
                {!note.is_read && (
                  <button 
                    onClick={() => handleMarkAsRead(note.id)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      fontSize: '0.7rem',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      cursor: 'pointer'
                    }}
                  >
                    {t('consumer.mark_as_read')}
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state text-center p-5">
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🔔</span>
              <p>{t('consumer.no_notifications')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Notifications;
