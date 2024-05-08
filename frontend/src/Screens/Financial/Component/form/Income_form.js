import React from "react";
import { useForm } from "react-hook-form";
import List from "../list/Income_list";
import { default as api } from "../../store/apiSlice";

export default function IncomeForm() {
  const { register, handleSubmit, reset } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();

  const onSubmit = async (data) => {
    if (!data) return {};
    await addTransaction(data).unwrap();
    reset();
    console.log("daef",data)
  };

  return (
    <div className="w-96 mx-auto">
      <h1 className="font-bold pb-4 text-xl text-center">Transaction</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("name")}
          placeholder="Name"
          className="bg-gray-200 appearance-none border-2 border-green-200 rounded w-full py-2 px-4 text-green-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
        />
        <select {...register("type")}   className="mt-1 block bg-gray-200 w-full py-2 px-3 border border-green-300  rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
          <option value="Delivery_fee">Delivery fee</option>
          <option value="Sales">Sales</option>
         
        </select>
        <input
          type="text"
          {...register("amount")}
          placeholder="Amount"
          className="bg-gray-200 appearance-none border-2 border-green-200 rounded w-full py-2 px-4 text-green-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
        />
        <input
          type="date"
          {...register("date")}
          placeholder="Date"
          className="bg-gray-200 appearance-none border-2 border-green-200 rounded w-full py-2 px-4 text-green-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
        />
        <button className="bg-green-800 text-white py-2 w-full rounded-md">
          Submit
        </button>
      </form>

      <List />
    </div>
  );
}
