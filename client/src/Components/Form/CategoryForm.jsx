import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container-fluid m-3 p-3">
          <div className="row g-3">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="New category"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="col-md-3 d-flex align-items-stretch">
              <button type="submit" className="btn btn-primary w-90">
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
