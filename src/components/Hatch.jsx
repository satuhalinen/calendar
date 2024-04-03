function Hatch({ number }) {
  return (
    <div
      style={{
        border: "1px solid black",

        width: "80%",
        height: "80%",
      }}
    >
      <div className="hatch">{number}</div>
    </div>
  );
}
export default Hatch;
