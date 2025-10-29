import spinnerGif from "../assets/images/spinner.gif";

type LoaderProps = {
  loading: boolean;
};

function Loader({ loading }: LoaderProps) {
  if (!loading) return null;

  return (
    <div className="flex justify-center mt-6">
      <img src={spinnerGif} alt="Loading..." className="w-60 h-40" />
    </div>
  );
}

export default Loader;
