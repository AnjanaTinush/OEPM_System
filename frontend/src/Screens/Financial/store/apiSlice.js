import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:5000";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
      // get: 'http://localhost:8080/api/categories'
      query: () => "/api/incomecategories",
      providesTags: ["categories"],
    }),

    // get labels
    getLabels: builder.query({
      // get: 'http://localhost:8080/api/labels'
      query: () => "/api/labels",
      providesTags: ["transaction"],
    }),

    // add new Transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        // post: 'http://localhost:8080/api/transaction'
        url: "/api/income",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),

    // delete record
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        // delete: 'http://localhost:8080/api/transaction'
        url: "/api/income",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["transaction"],
    }),
    editIncome: builder.mutation({
      query: (recordId) => ({
        // put: `http://localhost:8082/api/product/${updateProduct.id}`
        url: `/api/income/${recordId._id}`,
        method: "PUT",
        body: { recordId },
      }),
      invalidatesTags: ["transaction"],
    }),

    // ****************************************api request for expence

    getExpenceCategories: builder.query({
      // get: 'http://localhost:8080/api/categories'
      query: () => "/api/expencecategories",
      providesTags: ["categories"],
    }),

    // get labels
    getExpenceLabels: builder.query({
      // get: 'http://localhost:8080/api/labels'
      query: () => "/api/expencelabels",
      providesTags: ["expence"],
    }),

    // add new Transaction
    addExpence: builder.mutation({
      query: (initialTransaction) => ({
        // post: 'http://localhost:8080/api/transaction'
        url: "/api/expence",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["expence"],
    }),

    // delete record
    deleteExpence: builder.mutation({
      query: (recordId) => ({
        // delete: 'http://localhost:8080/api/transaction'
        url: "/api/expence",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["expence"],
    }),
    editExpence: builder.mutation({
      query: (recordId) => ({
        // put: `http://localhost:8082/api/product/${updateProduct.id}`
        url: `/api/expence/${recordId._id}`,
        method: "PUT",
        body: { recordId }, // Pass the updated properties in the body
      }),
      invalidatesTags: ["expence"],
    }),

    //Sallary
    addSallary: builder.mutation({
      query: (initialSallary) => ({
        url: "/api/empsallary",
        method: "POST",
        body: initialSallary,
      }),
      invalidatesTags: ["sallary"],
    }),

    getSallary: builder.query({
      query: () => "/api/empsallary",
      providesTags: ["sallary"],
    }),
  }),
});

export default apiSlice;
