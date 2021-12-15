import "./StartScreen.css";

export default function StartScreen() {
  return (
    <div className="w3-container start-screen">
      <h2 className="w3-center">Pleease wait, page is loading....</h2>
      <p>
        <i className="fa fa-spinner w3-spin" style={{ fontSize: "64px" }}></i>
      </p>
    </div>
  );
}
