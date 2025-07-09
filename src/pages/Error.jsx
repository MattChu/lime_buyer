import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  const retry = async () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Welcome to ERROR</h2>
      <hr />
      <img src="simpsonsLemon.gif" alt="simpons gif of man eating lemon" />
      <hr />
      <button onClick={retry}>RETRY</button>
    </div>
  );
}

export default Error;
