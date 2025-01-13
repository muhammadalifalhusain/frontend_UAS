const Notification = ({ message }) => {
    return (
      <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg">
        <p>{message}</p>
      </div>
    );
  };
  
  export default Notification;
  