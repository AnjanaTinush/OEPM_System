import React from "react";
import { useForm } from "react-hook-form";
import List from "../list/Income_list";
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
          className="form-input w-full"
        />
        <select {...register("type")} className="form-select w-full">
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

      <Expence_List />
    </div>
  );
}
