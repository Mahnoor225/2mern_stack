

const Displayimage = ({ imageurl, onclose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center p-4 z-50">
      <div className="relative">
        <img src={imageurl} className="max-w-full max-h-full" alt="Full screen" />
        <button 
          onClick={onclose} 
          className="absolute top-4 right-4 text-white bg-black p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Displayimage;
