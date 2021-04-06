import React from 'react';
import Logout from '../Logout/logout';
import {withRouter} from 'react-router';

function Dashboard(props) {
  

  return (
    <div>
      In dashboard
      <Logout {...props}></Logout>
    </div>
  );
}

export default withRouter(Dashboard);
