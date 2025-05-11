import React from 'react';
import './RSVPModal.css'; // for basic styling

const RSVPModal = ({ event, onConfirm, onCancel }) => {
  if (!event) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Book your spot!</h3>
        <p>
          Book your spot for <strong>{event.name}</strong> on <strong>{event.event_date}</strong> at <strong>{event.venue}</strong>.
        </p>
        <div className="modal-buttons">
          <button className="yes-btn" onClick={onConfirm}>Yes</button>
          <button className="no-btn" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default RSVPModal;
