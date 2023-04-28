const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="modal-wrapper__content">
      <div id="modal-wrapper__container">{children}</div>
    </div>
  );
};

export default ModalWrapper;
