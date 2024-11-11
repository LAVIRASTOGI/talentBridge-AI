export default function CustomDialogue({
  children,
  title,
  description,
  TiggerSection,
  idName,
}) {
  return (
    <>
      {TiggerSection}
      <input type="checkbox" id={idName} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">{title}</h3>
          <p className="py-2 text-lg">{description}</p>
          <div>{children}</div>
        </div>
        <label className="modal-backdrop" htmlFor={idName}>
          Close
        </label>
      </div>
    </>
  );
}
