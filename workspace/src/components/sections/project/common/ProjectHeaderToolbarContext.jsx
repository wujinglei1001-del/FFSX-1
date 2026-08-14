import { createContext, useContext } from 'react';

const ProjectHeaderToolbarLayoutContext = createContext('inline');

export const ProjectHeaderToolbarLayoutProvider = ProjectHeaderToolbarLayoutContext.Provider;

export const useProjectHeaderToolbarLayout = () => useContext(ProjectHeaderToolbarLayoutContext);
