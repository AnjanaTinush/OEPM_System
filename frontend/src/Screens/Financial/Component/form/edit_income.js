import React from "react";
import PropTypes from "prop-types";
import { default as api } from "../../store/apiSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast"; // Import toast

export default function EditIncome({ open, setOpen, productData }) {
  const { register } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();
  const [editProduct] = api.useEditIncomeMutation();
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    name: "",
    amount: "",
  });

  const handleType = (event) => {
    setFormData({ ...formData, type: event.target.value });
  };

  const handleDate = (event) => {
    setFormData({ ...formData, date: event.target.value });
  };

  const handleAmount = (event) => {
    const amount = event.target.value;
    if (amount > 0) {
      setFormData({ ...formData, amount });
    } else {
      toast.error("Amount must be greater than 0");
    }
  };

  const handleName = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: value,
    }));
  };

  React.useEffect(() => {
    setFormData(productData);
  }, [productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return {};

    if (productData) {
      await editProduct({
        _id: productData._id,
        data: formData,
      });
    } else {
      await addTransaction(formData).unwrap();
    }
    setOpen(false);
  };

  return (
    <div>
      <div
        className={`${
          open ? "block" : "hidden"
        } fixed z-10 inset-0 overflow-y-auto`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          ></div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <form onSubmit={handleSubmit}>
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="Name"
                      className="mt-1 block bg-gray-200 w-full py-2 px-3 border border-green-300  rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={formData.name}
                      onChange={handleName}
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3 sm:w-1/2">
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Type
                    </label>
                    <select
                      className="mt-1 block bg-gray-200 w-full py-2 px-3 border border-green-300  rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      {...register("type")}
                      value={formData.type}
                      onChange={handleType}
                    >
                      <option value="Delivery_fee">Delivery fee</option>
                      <option value="Expense">Sales</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 sm:flex sm:items-start">
                  <div className="w-full">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      {...register("amount")}
                      placeholder="Amount"
                      className="mt-1 block bg-gray-200 w-full py-2 px-3 border border-green-300  rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={formData.amount}
                      onChange={handleAmount}
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3 sm:w-1/2">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      {...register("date")}
                      className="mt-1 block bg-gray-200 w-full py-2 px-3 border border-green-300  rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={formData.date}
                      onChange={handleDate}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-800 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

EditIncome.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  productData: PropTypes.object,
};
