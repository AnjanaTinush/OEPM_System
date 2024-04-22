import React from "react";
import { useForm } from "react-hook-form";
import { default as api } from "../../store/apiSlice";
import Expence_List from "../list/ExpenceList";

export default function ExpenceForm() {
  const { register, handleSubmit, reset } = useForm();
  const [addExpence] = api.useAddExpenceMutation();

  const onSubmit = async (data) => {
    if (!data) return {};
    await addExpence(data).unwrap();
    reset();
    console.log("daef", data);
  };

  return (
    <div className="w-96 mx-auto">
      <h1 className="font-bold pb-4 text-xl text-center">Transaction</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("name")}
          placeholder="Salary, House Rent, SIP"
          className="bg-gray-200 appearance-none border-2 border-green-200 rounded w-full py-2 px-4 text-green-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
        />
        <select {...register("type")}   className="mt-1 block bg-gray-200 w-full py-2 px-3 border border-green-300  rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
          <option value="Tunnel_Construction">Tunnel Construction</option>
          <option value="Crop_and_Fertilizers">Crop and Fertilizers</option>
          <option value="Employee_Salaries">Employee Salaries</option>
          <option value="Repairs">Repairs</option>
          <option value="Other">Other</option>
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

      <Expence_List />
    </div>
  );
}
