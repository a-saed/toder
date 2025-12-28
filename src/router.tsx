import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import { Today } from "@/components/Today";
import { Layout } from "@/components/Layout";

// Use basename for GitHub Pages deployment
const basename = import.meta.env.BASE_URL || "/";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Today />} />
      <Route path="upcoming" element={<div>upcoming page goes here</div>} />
    </Route>
  ),
  { basename }
);
