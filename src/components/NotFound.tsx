const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__title">
        <span>List not found</span>
      </div>

      <div className="not-found__description">
        <span>
          We can't find the list you're looking for. Select one of your lists
          from the sidebar or create a new list.
        </span>
      </div>
    </div>
  );
};

export default NotFound;
