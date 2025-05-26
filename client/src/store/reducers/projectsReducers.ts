import { createSlice } from "@reduxjs/toolkit";
import type { Project } from "../types";

interface InitialState {
  isCreatingProject: boolean;
  currentProjectId: number;
  projects: Project[];
}

const initialState: InitialState = {
  isCreatingProject: false,
  currentProjectId: 0,
  projects: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setIsCreatingProject: (state, action) => {
      state.isCreatingProject = action.payload;
    },

    setCurrentProjectId: (state, action) => {
      state.currentProjectId = action.payload;
    },

    setProjects: (state, action) => {
      state.projects = action.payload;
    },

    addProject: (state, action) => {
      state.projects.push(action.payload);
    },

    deleteProject: (state, action) => {},
  },
});

export const {
  setIsCreatingProject,
  setCurrentProjectId,
  setProjects,
  addProject,
  deleteProject,
} = projectsSlice.actions;
export default projectsSlice.reducer;
