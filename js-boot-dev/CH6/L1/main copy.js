const notification = {
  notify(recipient, message) {
    return `Notification for ${recipient}: ${message}`;
  },
};

// don't touch below this line

export { notification, systemNotification };
