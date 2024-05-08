import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:5000";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
     
      query: () => "/api/incomecategories",
      providesTags: ["categories"],
    }),

    // get labels
    getLabels: builder.query({
     
      query: () => "/api/labels",
      providesTags: ["transaction"],
    }),

    // add new Transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
       
        url: "/api/income",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),

    // delete record
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        
        url: "/api/income",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["transaction"],
    }),
    editIncome: builder.mutation({
      query: (recordId) => ({
       
        url: `/api/income/${recordId._id}`,
        method: "PUT",
        body: { recordId }, // Pass the updated properties in the body
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
        
        url: "/api/expence",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["expence"],
    }),

    // delete record
    deleteExpence: builder.mutation({
      query: (recordId) => ({
       
        url: "/api/expence",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["expence"],
    }),
    editExpence: builder.mutation({
      query: (recordId) => ({
        
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

    editSallary: builder.mutation({
      query: (recordId) => ({
        
        url: `/api/empsallary/${recordId._id}`,
        method: "PUT",
        body: { recordId }, // Pass the updated properties in the body
      }),
      invalidatesTags: ["sallary"],
    }),
    deleteSallary: builder.mutation({
      query: (recordId) => ({
       
        url: "/api/empsallary",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["sallary"],
    }),

  }),
});

export default apiSlice;
