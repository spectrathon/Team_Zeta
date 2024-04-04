import React from 'react';

const EduCard = ({ imgSrc, title, description, percentage }) => {
  return (
    <div className="float float-col justify-between w-72  h-96 p-5 m-10 bg-white rounded-lg shadow-md overflow-x-auto overflow-y-auto">


      <div className=" items-center h-60 ">
        <img src={imgSrc} alt={title} className="w-28 h-28 mr-4 rounded-full allign-item-center justify-center ml-16 md-3" />
        <div className='md-10'>
          <h2 className="text-lg font-semibold mx-2 text-center my-4">{title}</h2>
          <p className="text-sm text-gray-600  mx-2 text-center my-4 ">{description}</p>
        </div>
      </div>

    </div>
  );
};

export default EduCard;
