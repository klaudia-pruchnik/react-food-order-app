export default function Success({ message, information, onClose }) {
  return (
    <>
      <h2>Success!</h2>
      <p>{message}</p>
      <p>{information}</p>
      <p className="modal-actions">
        <button className="button" onClick={onClose}>
          Okay
        </button>
      </p>
    </>
  );
}
