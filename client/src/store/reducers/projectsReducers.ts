import { createSlice } from "@reduxjs/toolkit";
import type { Project } from "../types";

interface InitialState {
  isLoading: boolean;
  isCreatingProject: boolean;
  currentProjectId: number;
  projects: Project[];
}

const initialState: InitialState = {
  isLoading: false,
  isCreatingProject: false,
  currentProjectId: 0,
  projects: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

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

    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },

    editProject: (state, action) => {
      const projectIndex = state.projects.indexOf(
        state.projects.find((p) => p.id === action.payload.id)!
      );

      state.projects[projectIndex] = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setIsCreatingProject,
  setCurrentProjectId,
  setProjects,
  addProject,
  deleteProject,
  editProject,
} = projectsSlice.actions;
export default projectsSlice.reducer;
