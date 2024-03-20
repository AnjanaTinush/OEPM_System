import React, { useState } from "react";

import "boxicons";
import { default as api } from "../../store/apiSlice";
import EditIncome from "../form/edit_income";

export default function Income_List() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();
  let Transactions;

  console.log("date set",data)
  const handlerClick = (e) => {
    if (!e.target.dataset.id) return 0;
    deleteTransaction({ _id: e.target.dataset.id });
  };

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = data.map((v, i) => (
      <Transaction key={i} category={v} handler={handlerClick}></Transaction>
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>
      {Transactions}
    </div>
  );
}

function Transaction({ category, handler }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
    setIsEditOpen(true);
  };

  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}
    >
      <button className="px-3" onClick={handler}>
        <box-icon
          data-id={category._id ?? ""}
          color={category.color ?? "#e5e5e5"}
          size="15px"
          name="trash"
        ></box-icon>
      </button>

      <button className="px-3"  onClick={handleOpen}>
        <box-icon
          data-id={category._id ?? ""}
          color={category.color ?? "#e5e5e5"}
          size="15px"
          name="edit-alt"
        ></box-icon>
      </button>
      <EditIncome
        open={openDialog}
        setOpen={setOpenDialog}
        productData={category}
      />

      <span className="block w-full">{category.name ?? ""}</span>
      <span className="block w-full">{category.date ?? ""}</span>
    </div>
  );
}
