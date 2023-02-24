import './App.css';
import React, { Suspense }  from 'react'
import Loader from './components/loader/Loader';
const UserCard = React.lazy(() => import("./components/card/UserCard/UserCard"));
function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader/>}>
      <UserCard/>
     </Suspense>
    </div>
  );
}

export default App;
