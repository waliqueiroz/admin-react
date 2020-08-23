import React from 'react';

import Navbar from '../Navbar';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

const Template: React.FC = ({ children }) => {
  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">XIblaubla</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">{children}</div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Template;
