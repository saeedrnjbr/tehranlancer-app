// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createAsyncThunk } from "@reduxjs/toolkit";

// export const BASE_URL = "http://localhost:8000/api"
export const BASE_URL = "https://panel.dibanik.ir/api"

export const fetchMovies = createAsyncThunk("fetchMovies", async () => {
  const res = await fetch(`${BASE_URL}/movies?per_page=10`);
  return res?.json();
});

export const fetchMovie = createAsyncThunk("fetchMovie", async (data) => {
  const res = await fetch(`${BASE_URL}/movies/${data.id}`);
  return res?.json();
});


export const fetchSliders = createAsyncThunk("fetchSliders", async () => {
  const res = await fetch(`${BASE_URL}/sliders`);
  return res?.json();
});

export const fetchEvents = createAsyncThunk("fetchEvents", async () => {
  const res = await fetch(`${BASE_URL}/events`);
  return res?.json();
});

export const fetchEventCategories = createAsyncThunk("fetchEventCategories", async () => {
  const res = await fetch(`${BASE_URL}/event-categories`);
  return res?.json();
});

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const res = await fetch(`${BASE_URL}/product-categories`);
  return res?.json();
});

export const fetchProduct = createAsyncThunk("fetchProduct", async (data) => {
  const res = await fetch(`${BASE_URL}/products/${data.id}`);
  return res?.json();
});

export const fetchEvent = createAsyncThunk("fetchEvent", async (data) => {
  const res = await fetch(`${BASE_URL}/events/${data.id}`);
  return res?.json();
});

export const fetchCategory = createAsyncThunk("fetchCategory", async (data) => {
  const res = await fetch(`${BASE_URL}/product-categories/${data.id}`);
  return res?.json();
});


export const fetchCourse = createAsyncThunk("fetchCourse", async (data) => {
  const res = await fetch(`${BASE_URL}/courses/${data.id}`);
  return res?.json();
});

export const fetchFreelancer = createAsyncThunk("fetchFreelancer", async (data) => {
  const res = await fetch(`${BASE_URL}/freelancers/${data.id}`);
  return res?.json();
});


export const fetchCourses = createAsyncThunk("fetchCourses", async (data) => {
  const res = await fetch(`${BASE_URL}/courses/${data ? data.id : ''}`);
  return res?.json();
});

export const fetchCoursesByLevel = createAsyncThunk("fetchCoursesByLevel", async (data) => {
  const res = await fetch(`${BASE_URL}/courses/level/${data.id}`);
  return res?.json();
});


export const fetchCourseByCategories = createAsyncThunk("fetchCourseByCategories", async (data) => {
  const res = await fetch(`${BASE_URL}/course-categories/${data.id}/courses`);
  return res?.json();
});

export const fetchCourseCategories = createAsyncThunk("fetchCourseCategories", async () => {
  const res = await fetch(`${BASE_URL}/course-categories`);
  return res?.json();
});

export const fetchLessons = createAsyncThunk("fetchLessons", async (data) => {
  const res = await fetch(`${BASE_URL}/courses/${data.id}/lessons`);
  return res?.json();
});


export const fetchLesson = createAsyncThunk("fetchLesson", async (data) => {
  const res = await fetch(`${BASE_URL}/lessons/${data.id}`);
  return res?.json();
});

export const fetchCourseCategoryTrees = createAsyncThunk("fetchCourseCategoryTrees", async (data) => {
  const res = await fetch(`${BASE_URL}/course-categories/tree/${data ? data.id : 0}`);
  return res?.json();
});

export const fetchCourseCategory = createAsyncThunk("fetchCourseCategory", async (data) => {
  const res = await fetch(`${BASE_URL}/course-categories/${data.id}`);
  return res?.json();
});

export const fetchFreelancers = createAsyncThunk("fetchFreelancers", async () => {
  const res = await fetch(`${BASE_URL}/freelancers`);
  return res?.json();
});

export const fetchFreelancerLevels = createAsyncThunk("fetchFreelancerLevels", async () => {
  const res = await fetch(`${BASE_URL}/freelancers/level`,{
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("lancerToken")}`,
    }
  });
  return res?.json();
});


export const fetchProducts = createAsyncThunk("fetchProducts", async (data) => {
  const res = await fetch(`${BASE_URL}/products?${data ? `category_id=${data.id}` : ""}`);
  return res?.json();
});


export const fetchUserLogin = createAsyncThunk("fetchUserLogin", async (data) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return res?.json();
});


export const fetchUserVerify = createAsyncThunk("fetchUserVerify", async (data) => {
  const res = await fetch(`${BASE_URL}/users/verify`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return res?.json();
});


export const fetchUserCurrent = createAsyncThunk("fetchUserCurrent", async () => {
  const res = await fetch(`${BASE_URL}/users/current`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("lancerToken")}`,
    }
  });
  return res?.json();
});

export const fetchStoreFreelancerLevel = createAsyncThunk("fetchStoreFreelancerLevel", async (data) => {

  let form = new FormData();

  form.append('first_name', data["first_name"]);

  form.append('last_name', data["last_name"]);

  form.append('level', data["level"]);

  form.append('gender', data["gender"]);

  form.append('school', data["school"]);

  form.append('avatar', data["avatar"]);

  form.append('field', data["field"]);

  form.append('courses', data["courses"]);

  const res = await fetch(`${BASE_URL}/freelancers/level`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("lancerToken")}`,
    },
    method: "POST",
    body: form,
  });
  return res?.json();
});


export const fetchEventReuqest = createAsyncThunk("fetchEventReuqest", async (data) => {
  const res = await fetch(`${BASE_URL}/events/request`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("lancerToken")}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return res?.json();
});



export const fetchFreelancerRequest = createAsyncThunk("fetchFreelancerRequest", async (data) => {

  let form = new FormData();

  form.append('owner', data["owner"]);

  form.append('freelancer_id', data["freelancer_id"]);

  form.append('mobile', data["mobile"]);

  form.append('address', data["address"]);

  form.append('stack', data["stack"]);

  form.append('project_file', data["project_file"]);

  form.append('project_name', data["project_name"]);

  form.append('project_description', data["project_description"]);

  const res = await fetch(`${BASE_URL}/freelancers/request`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("lancerToken")}`,
    },
    method: "POST",
    body: form,
  });
  return res?.json();
});
