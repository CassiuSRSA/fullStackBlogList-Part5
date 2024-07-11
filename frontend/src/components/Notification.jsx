const Notification = ({ message }) => {
  return (
    <div>
      <h3 className={message.type}>{message.message}</h3>
    </div>
  );
};

export default Notification;
