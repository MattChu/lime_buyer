import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
  const { user, setuser } = useContext(UserContext);
  return <></>;
}

export default App;
