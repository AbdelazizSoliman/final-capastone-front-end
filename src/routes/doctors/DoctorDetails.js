import React from 'react';
import SideNav from '../../components/home/SideNav';

function DoctorDetails() {
  return (
    <div className="h-screen flex lg:overflow-hidden bg-white">
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <SideNav />
      </div>
      <div className="flex flex-col min-w-0 flex-1 lg:overflow-hidden mt-32 lg:mt-1">
        <div className="flex flex-col items-center">
          <Details />
        </div>
      </div>
    </div>
  );
}
export default DoctorDetails;
