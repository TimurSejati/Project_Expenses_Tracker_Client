import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import moneySVG from "../img/money.svg";
import { updateExpenseAction } from "../redux/slices/expenses/expenseSlices";
import { updateIncomeAction } from "../redux/slices/income/incomeSlices";
import DisabledButton from "../components/DisabledButton";
import { useLocation } from "react-router-dom";

//form validations
const formSchema = Yup.object({
  title: Yup.string().required("title is required"),
  description: Yup.string().required("description: is required"),
  amount: Yup.number().required("Amount is required"),
});

const EditContent = () => {
  //dispatch
  const dispatch = useDispatch();
  const { state: { item } } = useLocation();
  //formik form
  const formik = useFormik({
    initialValues: {
      title: item?.title,
      description: item?.description,
      amount: item?.amount,
    },
    onSubmit: values => {
      const data = {
        ...values,
        id: item?._id,
      };
      item?.type === 'income' ? dispatch(updateIncomeAction(data)) : dispatch(updateExpenseAction(data));
    },
    validationSchema: formSchema,
  });

  //get data form store

  const expenseData = useSelector(state => state.expenses);
  const { appErr, serverErr, expenseUpdated, loading } = expenseData;

  return (
    <section className="py-5 bg-secondary vh-100">
      <div className="container text-center">
        <a className="d-inline-block mb-5">
          <img
            className="img-fluid"
            src={moneySVG}
            alt="SVGeXPENSES"
            width="200"
          />
        </a>

        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-white">
              <form onSubmit={formik.handleSubmit}>
                <span className="text-muted"></span>
                {/* Display Err */}
                {appErr || serverErr ? <div>Err</div> : null}
                <h2>{item?.type === "income" ? "Update Income" : "Update Expense"}</h2>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Title"
                  />
                </div>
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.title && formik.errors.title}
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Description"
                  />
                </div>
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.description && formik.errors.description}
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.amount}
                    onChange={formik.handleChange("amount")}
                    onBlur={formik.handleBlur("amount")}
                    className="form-control"
                    type="number"
                    placeholder="Enter Amount"
                  />
                </div>
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.amount && formik.errors.amount}
                </div>
                {loading ? (
                  <DisabledButton />
                ) : (
                  <button type="submit" className="btn btn-primary mb-4 w-100">
                    Update
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditContent;
