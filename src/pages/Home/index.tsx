import React from 'react';
import TabContent from './components/TabContent';
import { status } from '../../util/constants';

const Home: React.FC = () => {
  return (
    <div className="card">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs" role="tablist">
          <li className="nav-item active">
            <a
              role="tab"
              className="nav-link active"
              data-toggle="tab"
              href="#pending"
            >
              Pendentes
            </a>
          </li>
          <li className="nav-item">
            <a
              role="tab"
              className="nav-link"
              data-toggle="tab"
              href="#under-analysis"
            >
              Em análise
            </a>
          </li>
          <li className="nav-item">
            <a
              role="tab"
              className="nav-link"
              data-toggle="tab"
              href="#approved"
            >
              Aprovados
            </a>
          </li>
          <li className="nav-item">
            <a
              role="tab"
              className="nav-link"
              data-toggle="tab"
              href="#disapproved"
            >
              Reprovados
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <div className="tab-content">
          <div id="pending" className="tab-pane show fade in active">
            <TabContent statusId={status.PENDING} />
          </div>
          <div id="under-analysis" className="tab-pane fade">
            <TabContent statusId={status.UNDER_ANALYSIS} />
          </div>
          <div id="approved" className="tab-pane fade">
            <TabContent statusId={status.APPROVED} />
          </div>
          <div id="disapproved" className="tab-pane fade">
            <TabContent statusId={status.DISAPPROVED} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
