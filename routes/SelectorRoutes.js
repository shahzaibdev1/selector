import express from "express";
import {
  addCountryListing,
  addMarketplace,
  addPageType,
  addSelector,
  findcountry,
  findOne,
  findpagetype,
  findselectors,
  getAllSelectors,
  getFilteredSelectors,
  getPageTypes,
  getSelectorsDashboard,
  listCountries,
  listMarketplace,
  updatecountry,
  updateMarketplace,
  updatepagetype,
  updateselectors,
} from "../controllers/selectorController.js";
import apiMiddleware from "../middlewares/apiMiddleware.js";
import authMiddleware, { roles } from "../middlewares/authMiddleware.js";
var router = express.Router();

router.post("/", authMiddleware([roles.admin, roles.subAdmin]), addSelector);

router.post(
  "/add-marketplace",
  authMiddleware([roles.admin, roles.subAdmin]),
  addMarketplace
);

router.post(
  "/add-country",
  authMiddleware([roles.admin, roles.subAdmin]),
  addCountryListing
);

router.post(
  "/add-page-type",
  authMiddleware([roles.admin, roles.subAdmin]),
  addPageType
);

router.get(
  "/get-all",
  authMiddleware([roles.admin, roles.subAdmin]),
  getAllSelectors
);

router.post("/get-filtered", apiMiddleware(), getFilteredSelectors);
router.post(
  "/get-dashboard-selectors",
  authMiddleware([roles.admin, roles.subAdmin]),
  getSelectorsDashboard
);
router.get(
  "/get-all-pagetypes",
  authMiddleware([roles.admin, roles.subAdmin]),
  getPageTypes
);

router.get(
  "/list-marketplace",
  authMiddleware([roles.admin, roles.subAdmin]),
  listMarketplace
);

router.get(
  "/list-countries",
  authMiddleware([roles.admin, roles.subAdmin]),
  listCountries
);

router.get(
  "/findmarketplace/:id",
  authMiddleware([roles.admin, roles.subAdmin]),
  findOne
);

router.patch(
  "/updatemarketplace/:id",
  authMiddleware([roles.admin, roles.subAdmin]),
  updateMarketplace
);

router.get(
  "/findpagetype/:id",
  authMiddleware([roles.admin, roles.subAdmin]),
  findpagetype
);

router.patch(
  "/updatepagetype/:id",
  authMiddleware([roles.admin, roles.subAdmin]),
  updatepagetype
);

router.get(
  "/findselectors/:id",
  authMiddleware([roles.admin, roles.subAdmin]),
  findselectors
);

router.get(
  "/findcountry/:id",
  authMiddleware([roles.admin, roles.subAdmin]),
  findcountry
);

router.patch(
  "/updateselectors/:id",
  authMiddleware([roles.admin, roles.subAdmin]),
  updateselectors
);

router.patch(
  "/updatecountry/:id",
  authMiddleware([roles.admin, roles.subAdmin]),
  updatecountry
);

export default router;
