import { Router } from "express";
import { mailingList } from "./mailingList.js";
import { admin } from "./admin.js";
import { life } from "./life.js";
import { tech } from "./tech.js";

export const mainRouter=Router();

mainRouter.use("/mailing-list", mailingList);
mainRouter.use("/life", life)
mainRouter.use("/tech", tech)
mainRouter.use("/admin", admin)