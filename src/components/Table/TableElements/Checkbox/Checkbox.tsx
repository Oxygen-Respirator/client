import {} from "react";

export default function Checkbox({ isCheck }: Checkbox) {
  return (
    <div className={`ty-checkbox ${isCheck ? "ty-checkbox-checked" : ""}`}>
      <span className="ty-line ty-left-line"></span>
      <span className="ty-line ty-right-line"></span>
    </div>
  );
}
