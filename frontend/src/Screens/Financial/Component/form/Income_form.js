import React from "react";
import { useForm } from "react-hook-form";
import { default as api } from "../../store/apiSlice";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import List from "../list/Income_list";

export default function IncomeForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();

  const onSubmit = async (data) => {
    if (!data) return {};
    try {
      await addTransaction(data).unwrap();
      reset();
      toast.success("Transaction added successfully");
    } catch (error) {
      toast.error("Error adding transaction");
    }
  };

  // Custom validation to disallow negative or zero values for amount
  const validateAmount = (value) =>
    parseFloat(value) > 0 || "Amount must be greater than 0";

  return (
    <div className="w-96 mx-auto">
      <h1 className="font-bold pb-4 text-xl text-center">Transaction</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className={`bg-gray-200 appearance-none border-2 border-green-200 rounded w-full py-2 px-4 text-green-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <div className="text-red-500 mb-4">{errors.name.message}</div>
        )}
        <select
          {...register("type", { required: "Type is required" })}
          className={`mt-1 block bg-gray-200 w-full py-2 px-3 border border-green-300  rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
            errors.type ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Type</option>
          <option value="Delivery_fee">Delivery fee</option>
          <option value="Sales">Sales</option>
        </select>
        {errors.type && (
          <div className="text-red-500 mb-4">{errors.type.message}</div>
        )}
        <input
          type="number"
          {...register("amount", {
            required: "Amount is required",
            validate: validateAmount,
          })}
          placeholder="Amount"
          className={`bg-gray-200 appearance-none border-2 border-green-200 rounded w-full py-2 px-4 text-green-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 ${
            errors.amount ? "border-red-500" : ""
          }`}
        />
        {errors.amount && (
          <div className="text-red-500 mb-4">{errors.amount.message}</div>
        )}
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          placeholder="Date"
          className={`bg-gray-200 appearance-none border-2 border-green-200 rounded w-full py-2 px-4 text-green-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 ${
            errors.date ? "border-red-500" : ""
          }`}
        />
        {errors.date && (
          <div className="text-red-500 mb-4">{errors.date.message}</div>
        )}
        <button className="bg-green-800 text-white py-2 w-full rounded-md">
          Submit
        </button>
      </form>

      <List />
    </div>
  );
}
