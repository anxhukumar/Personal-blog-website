import { Router } from "express";
import { mailingList } from "./mailingList";
import { admin } from "./amdin";
import { life } from "./life";
import { tech } from "./tech";

export const mainRouter=Router();

mainRouter.use("/mailing-list", mailingList);
mainRouter.use("/life", life)
mainRouter.use("/tech", tech)
mainRouter.use("/admin", admin)