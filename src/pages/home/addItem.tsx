import React from 'react';
import { Plus } from 'react-feather';
import { Link } from 'react-router-dom';

const AddOTPItem = () => {
  return (
    <Link to="/new" className="bg-white p-5 mb-6 rounded-md shadow-lg flex justify-center w-full">
      <Plus />
    </Link>
  );
}

export default AddOTPItem;