// src/components/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MiniDrawer from './MiniDrawer';

const AppRouter = () => {
  return (
    <Router>
      <MiniDrawer>
        <Routes>
          <Route path="/dashboard" element={<div>App Content</div>} />
          <Route path="/dashboard/ecommerce" element={<div>Ecommerce Content</div>} />
          <Route path="/dashboard/analytics" element={<div>Analytics Content</div>} />
          <Route path="/dashboard/banking" element={<div>Banking Content</div>} />
          <Route path="/dashboard/booking" element={<div>Booking Content</div>} />
          <Route path="/dashboard/file" element={<div>File Content</div>} />
          <Route path="/dashboard/course" element={<div>Course Content</div>} />
          <Route path="/dashboard/user" element={<div>User Content</div>} />
          <Route path="/dashboard/product" element={<div>Product Content</div>} />
          <Route path="/dashboard/order" element={<div>Order Content</div>} />
          <Route path="/dashboard/invoice" element={<div>Invoice Content</div>} />
          <Route path="/dashboard/blog" element={<div>Blog Content</div>} />
          <Route path="/dashboard/job" element={<div>Job Content</div>} />
          <Route path="/dashboard/tour" element={<div>Tour Content</div>} />
          <Route path="/dashboard/permission" element={<div>Permission Content</div>} />
          <Route path="/dashboard/level" element={<div>Level Content</div>} />
          <Route path="/dashboard/disabled" element={<div>Disabled Content</div>} />
          <Route path="/dashboard/label" element={<div>Label Content</div>} />
          <Route path="/dashboard/params" element={<div>Params Content</div>} />
          <Route path="/dashboard/blank" element={<div>Blank Content</div>} />
        </Routes>
      </MiniDrawer>
    </Router>
  );
};

export default AppRouter;