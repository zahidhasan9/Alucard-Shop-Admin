const SearchForm = ({ searchTerm, onSearchChange }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="position-relative table-src-form me-0">
      <input
        type="text"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="form-control"
      />
      <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y">search</span>
    </form>
  );
};

export default SearchForm;
