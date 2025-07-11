import { useContext } from "react";
import { LoadingAndErrorContext } from "../contexts/LoadingErrorContext";
import { Navigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

function LoaderError() {
  const { isLoading, isError } = useContext(LoadingAndErrorContext);
  return (
    <>
      {isError && <Navigate to="/lemons" />}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PropagateLoader color="green" />
        </div>
      )}
    </>
  );
}

export default LoaderError;
