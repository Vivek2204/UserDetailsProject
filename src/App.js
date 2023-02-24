import "./App.css";
import React, { Suspense } from "react";
import Loader from "./components/loader/Loader";
import UserContextProvider from "./components/context/UserContext";
const UserCard = React.lazy(() =>
  import("./components/card/UserCard/UserCard")
);
function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <UserContextProvider>
          <UserCard />
        </UserContextProvider>
      </Suspense>
    </div>
  );
}

export default App;
