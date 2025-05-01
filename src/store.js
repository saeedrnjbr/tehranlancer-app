import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/movies";
import slidersReducer from "./slices/sliders";
import eventsReducer from "./slices/events";
import coursesReducer from "./slices/courses";
import freelancersReducer from "./slices/freelancers";
import productsReducer from "./slices/products";
import lessonsReducer from "./slices/lessons";
import usersReducer from "./slices/users";
import courseCategoriesReducer from "./slices/course-categories";
import categoriesReducer from "./slices/categories";

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        categories: categoriesReducer,
        sliders: slidersReducer,
        courses: coursesReducer,
        events: eventsReducer,
        freelancers: freelancersReducer,
        products: productsReducer,
        users: usersReducer,
        courseCategories: courseCategoriesReducer,
        lessons: lessonsReducer
    },
});

export default store;