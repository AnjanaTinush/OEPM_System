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
          className="form-input w-full"
        />
        <select {...register("type")} className="form-select w-full">
          <option value="Delivery_fee">Delivery fee</option>
          <option value="Sales">Sales</option>
         
        </select>
        <input
          type="text"
          {...register("amount")}
          placeholder="Amount"
          className="form-input w-full"
        />
        <input
          type="date"
          {...register("date")}
          placeholder="Date"
          className="form-input w-full"
        />
        <button className="bg-green-800 text-white py-2 w-full rounded-md">
          Submit
        </button>
      </form>

      <List />
    </div>
  );
}
