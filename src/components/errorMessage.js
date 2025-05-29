import "../index.css";

export default function ErrorMessage({ errMsg }) {
  return (
    <p className="error">
      <span>🛑</span> {errMsg}
    </p>
  );
}
