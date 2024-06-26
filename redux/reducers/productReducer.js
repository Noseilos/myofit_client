import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer({
    products: [],
    product: {},
    comments: [], // Adding reviews state
    comment: {}, // Adding reviews state

}, (builder) => {
    builder
        .addCase("getAllProductsRequest", (state) => {
            state.loading = true;
        })
        .addCase("getAdminProductsRequest", (state) => {
            state.loading = true;
        })
        .addCase("getProductDetailsRequest", (state) => {
            state.loading = true;
        })
        .addCase("getAllReviewsRequest", (state) => { // Adding case for fetching reviews
            state.loading = true;
        })
        .addCase("getAllProductsSuccess", (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase("getAdminProductsSuccess", (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.inStock = action.payload.inStock;
            state.outOfStock = action.payload.outOfStock;
        })
        .addCase("getProductDetailsSuccess", (state, action) => {
            state.loading = false;
            state.product = action.payload;
        })
        .addCase("getAllReviewsSuccess", (state, action) => { // Adding case for successful reviews fetch
            state.loading = false;
            state.comment = action.payload;
        })

        .addCase("getAllProductsFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("getAdminProductsFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("getProductDetailsFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("getAllReviewsFail", (state, action) => { // Adding case for failed reviews fetch
            state.loading = false;
            state.error = action.payload;
        })

    builder.addCase("resetProduct", (state) => {
        state.loading = false;
        state.products = [];
        state.inStock = null;
        state.outOfStock = null;
        
    })
    
    builder.addCase("clearError", (state) => {
        state.error = null;
    });
    
    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });
});
