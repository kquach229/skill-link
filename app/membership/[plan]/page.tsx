import React from 'react';

const MembershipDetails = ({ params }) => {
  return (
    <div className='container'>
      <h1>{params.plan} Plan</h1>
    </div>
  );
};

export default MembershipDetails;
