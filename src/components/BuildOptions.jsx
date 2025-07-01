export default function BuildOptions({ buildStatus }) {
  return (
    <>
      <button className="btn btn-primary w-full">
        Mark as {buildStatus == "For sale" ? "sold" : "available"}
      </button>
      <button className="btn btn-secondary w-full">Edit</button>
      <button className="btn btn-secondary w-full">View</button>
    </>
  );
}
