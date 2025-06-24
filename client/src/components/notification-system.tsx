import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export function NotificationSystem({ notifications, onRemove }: NotificationSystemProps) {
  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration) {
        const timer = setTimeout(() => {
          onRemove(notification.id);
        }, notification.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onRemove]);

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'success':
        return {
          background: 'linear-gradient(45deg, #39FF14, #FFD700)',
          borderColor: '#39FF14',
          textColor: '#0D0D0D'
        };
      case 'error':
        return {
          background: 'linear-gradient(45deg, #FF0033, #9A00FF)',
          borderColor: '#FF0033',
          textColor: '#F5F5F5'
        };
      case 'warning':
        return {
          background: 'linear-gradient(45deg, #FFD700, #FFF300)',
          borderColor: '#FFD700',
          textColor: '#0D0D0D'
        };
      default:
        return {
          background: 'linear-gradient(45deg, #9A00FF, #39FF14)',
          borderColor: '#9A00FF',
          textColor: '#F5F5F5'
        };
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'error':
        return 'fas fa-exclamation-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      default:
        return 'fas fa-info-circle';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => {
          const styles = getNotificationStyles(notification.type);
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="max-w-sm p-4 rounded-lg shadow-lg border-2 backdrop-blur-md"
              style={{
                background: styles.background,
                borderColor: styles.borderColor,
                color: styles.textColor,
                boxShadow: `0 10px 25px ${styles.borderColor}30`
              }}
            >
              <div className="flex items-start space-x-3">
                <i className={`${getIcon(notification.type)} text-lg mt-1`}></i>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{notification.title}</h4>
                  <p className="text-xs mt-1 opacity-90">{notification.message}</p>
                </div>
                <button
                  onClick={() => onRemove(notification.id)}
                  className="text-current opacity-70 hover:opacity-100 transition-opacity"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = {
      ...notification,
      id,
      duration: notification.duration || 5000
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const success = (title: string, message: string, duration?: number) => {
    addNotification({ type: 'success', title, message, duration });
  };

  const error = (title: string, message: string, duration?: number) => {
    addNotification({ type: 'error', title, message, duration });
  };

  const info = (title: string, message: string, duration?: number) => {
    addNotification({ type: 'info', title, message, duration });
  };

  const warning = (title: string, message: string, duration?: number) => {
    addNotification({ type: 'warning', title, message, duration });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    info,
    warning
  };
}