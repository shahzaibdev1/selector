import mongoose from "mongoose";
import Countries from "../models/Countries.js";
import Listing from "../models/Listing.js";
import Marketplace from "../models/Marketplace.js";
import PageType from "../models/PageType.js";
import Selector from "../models/Selector.js";
import User from "../models/User.js";
import { stripe } from "../stripe.js";
import {
  validateCountryInput,
  validateMarketplaceInput,
  validatePagetypeInput,
  validateSelectorsInput,
} from "../validators/authValidator.js";

/**
 * @route POST /api/v1/selectors
 * @desc  Add a new selector
 * @access super private
 **/
export const addSelector = async (req, res) => {
  const { isValid, errors, values } = validateSelectorsInput({
    ...req.body,
  });

  const { marketplace, marketplaceUrl, country, countryCode, pageType } =
    req.body;
  try {
    if (!isValid) {
      return res.status(400).send({ errors });
    }

    let getListing = {};
    const oldListing = await Listing.findOne({ pageType }).select("listing");

    if (oldListing) {
      getListing = oldListing;
    } else {
      getListing = await Listing.create({
        marketplace,
        marketplaceUrl,
        country,
        countryCode,
        pageType,
      });
    }

    Listing.populate(getListing, "listing");
    // const getListing = await Listing.aggregate([
    //   {
    //     $match: { marketplace: req.body.marketplace },
    //   },
    //   { $unwind: "$listing" },
    // ]);

    // let indexOf = getListing[0]?.listing?.listing.findIndex((each) => {
    //   return each.pageType === req.body.pageType;
    // });

    const newSelector = await Selector.create({
      selectorName: req.body.selectorName,
      selectorText: req.body.selectorText,
      tagName: req.body.tagName,
      valueAccessProperty: req.body.valueAccessProperty,
      hint: req.body.hint,
      attribute: req.body.attribute,
      valueToMatch: req.body.valueToMatch,
    });

    getListing.listing.push(newSelector);
    getListing.save();
    // await Listing.updateOne(
    //   { _id: getListing[0]._id },
    //   { $set: getListing[0] }
    // );

    return res.json(getListing);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", err: err.message });
  }
};

/**
 * @route POST /api/v1/selectors/add-marketplace
 * @desc  Add a new Marketplace
 * @access super private
 **/
export const addMarketplace = async (req, res) => {
  const { isValid, errors, values } = validateMarketplaceInput({
    ...req.body,
  });
  try {
    if (!isValid) {
      return res.status(400).send({ errors });
    }
    const getMarketplace = await Marketplace.findOne({
      marketplace: req.body.marketplace,
    });

    if (getMarketplace) {
      return res.status(400).json({ message: "Marketplace already exists" });
    }

    const newMarketplace = await Marketplace.create({
      marketplace: req.body.marketplace,
      marketplaceUrl: req.body.url,
    });

    return res.json(newMarketplace);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @route POST /api/v1/selectors/list-marketplace
 * @desc  Add a new Marketplace
 * @access super private
 **/
export const listMarketplace = async (req, res) => {
  try {
    const getMarketplace = await Marketplace.find().select(
      "marketplace marketplaceUrl"
    );

    return res.json(getMarketplace);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @route POST /api/v1/selectors/add-country
 * @desc  Add a new country
 * @access super private
 **/
export const addCountryListing = async (req, res) => {
  const { isValid, errors, values } = validateCountryInput({
    ...req.body,
  });
  try {
    if (!isValid) {
      return res.status(400).send({ errors });
    }
    const getMarketplace = await Marketplace.findById(req.body.marketplace);

    if (!getMarketplace) {
      return res
        .status(404)
        .json({ errors: { message: "Marketplace not found" } });
    }

    const newCountry = await Countries.create({
      country: req.body.country,
      countryCode: req.body.countryCode,
      marketplace: req.body.marketplace,
    });

    res.json(newCountry._doc);
    getMarketplace.countryList.push(newCountry);
    getMarketplace.save();
    return;
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", err: err.message });
  }
};

/**
 * @route POST /api/v1/selectors/list-countries
 * @desc  Add a new Marketplace
 * @access super private
 **/
export const listCountries = async (req, res) => {
  try {
    const getCountries = await Countries.find(
      req.query.marketplace
        ? {
            marketplace: req.query.marketplace,
          }
        : {}
    ).populate({ path: "marketplace", select: "marketplace" });

    return res.json(getCountries);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @route POST /api/v1/selectors/add-page-type
 * @desc  Add a new page type
 * @access super private
 **/
export const addPageType = async (req, res) => {
  const { isValid, errors, values } = validatePagetypeInput({
    ...req.body,
  });
  try {
    if (!isValid) {
      return res.status(400).send({ errors });
    }

    const getCountry = await Countries.findById(req.body.country);

    if (!getCountry) {
      return res.status(404).json({ errors: { message: "Country not found" } });
    }

    const getPageTypes = await PageType.findOne({
      pageType: req.body.pageType,
      country: req.body.country,
    });

    if (getPageTypes) {
      return res
        .status(400)
        .json({ errors: { message: "Page Type already exists" } });
    }

    const addNewPageType = await PageType.create({
      pageType: req.body.pageType,
      country: req.body.country,
    });

    getCountry.pageTypes.push(addNewPageType);
    getCountry.save();
    return res.status(201).json(addNewPageType);
  } catch (err) {
    return res.status(500).json({ error: { message: "Sorry!Not Send" } });
  }
};

/**
 * @route GET /api/v1/selectors/get-all-pagetypes
 * @desc  Add a new page type
 * @access super private
 **/
export const getPageTypes = async (req, res) => {
  try {
    let query = {};

    if (req.query.country) {
      query.country = req.query.country;
    }

    if (req.query.marketplace) {
      query.marketplace = req.query.marketplace;
    }

    let result = await PageType.find(query)
      .select("pageType country")
      .populate({ path: "country", select: "country" });

    return res.status(201).json(result);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", err: err.message });
  }
};

/**
 * @route POST /api/v1/selectors/get-all
 * @desc  Get all selectors
 * @access Super private
 **/
export const getAllSelectors = async (req, res) => {
  try {
    let data = await Listing.find()
      .populate({
        path: "listing",
        select:
          "selectorName selectorText tagName attribute valueToMatch valueAccessProperty hint",
      })
      .populate({ path: "pageType", select: "pageType" })
      .populate({ path: "marketplace", select: "marketplace marketplaceUrl" })
      .populate({ path: "country", select: "country countryCode" });

    return res.json({ data });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @route POST /api/v1/selectors/get-filtered
 * @desc  Get all selectors
 * @access Super private
 **/
export const getFilteredSelectors = async (req, res) => {
  try {
    const { body } = req;

    let value = {};
    Object.entries(body).forEach(([key, keyValue]) => {
      if (keyValue) value[key] = keyValue;
    });

    let config = {
      skip:
        Math.max(0, parseInt(req.query.page) - 1) * parseInt(req.query.limit),
      sort: { createdAt: req.query.sortBy },
      limit: parseInt(req.query.limit),
    };

    let result = await Listing.find({
      ...(Object.keys(value).length !== 0 && {
        $and: Object.entries(value).map(([key, value]) => {
          return {
            [key]:
              mongoose.isValidObjectId(value) || typeof value !== "string"
                ? value
                : { $regex: value, $options: "i" },
          };
        }),
      }),
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "listing",
        select:
          "selectorName selectorText tagName attribute valueToMatch valueAccessProperty hint",
      })
      .populate({ path: "pageType", select: "pageType" })
      .populate({ path: "marketplace", select: "marketplace marketplaceUrl" })
      .populate({ path: "country", select: "country countryCode" });

    let data = {};

    result.forEach((each) => {
      let betterData = {
        [each.country.countryCode]: {
          [each.pageType.pageType]: each.listing,
        },
      };

      if (req.myQuery.includes(each.marketplace.marketplace)) {
        data[each.marketplace.marketplace] = betterData;
      }
    });

    return res.json({
      data,
      limit: config.limit,
      page: req.query.page,
      sort: req.query.sortBy,
      documents: result.length,
    });
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

/**
 * @route POST /api/v1/selectors/get-dashboard-selectors
 * @desc  Get all selectors
 * @access Super private
 **/
export const getSelectorsDashboard = async (req, res) => {
  try {
    const { body } = req;

    let value = {};
    Object.entries(body).forEach(([key, keyValue]) => {
      if (keyValue) value[key] = keyValue;
    });

    let config = {
      skip:
        Math.max(0, parseInt(req.query.page) - 1) * parseInt(req.query.limit),
      sort: { createdAt: req.query.sortBy },
      limit: parseInt(req.query.limit),
    };

    let result = await Listing.find({
      ...(Object.keys(value).length !== 0 && {
        $and: Object.entries(value).map(([key, value]) => {
          return {
            [key]: mongoose.isValidObjectId(value)
              ? value
              : { $regex: value, $options: "i" },
          };
        }),
      }),
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "listing",
        select:
          "selectorName selectorText tagName hint attribute valueToMatch valueAccessProperty",
      })
      .populate({ path: "pageType", select: "pageType" })
      .populate({ path: "marketplace", select: "marketplace marketplaceUrl" })
      .populate({ path: "country", select: "country countryCode" });

    return res.json({
      data: result,
      limit: config.limit,
      page: req.query.page,
      sort: req.query.sortBy,
      documents: result.length,
    });
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }

  // try {
  //   let sorts = [
  //     {
  //       $skip:
  //         req.query.limit && req.query.page
  //           ? Math.max(0, parseInt(req.query.page) - 1) *
  //             parseInt(req.query.limit)
  //           : 0,
  //     },
  //     { $sort: { createdAt: parseInt(req.query.sortBy || -1) } },
  //     req.query.limit && { $limit: parseInt(req.query.limit) },
  //   ].filter((each) => !!each);

  //   let filters = [
  //     req.query.marketplace && {
  //       $match: { marketplace: req.query.marketplace },
  //     },
  //     req.query.country && { $unwind: "$listing" },
  //     req.query.country && { $match: { "listing.country": req.query.country } },
  //     req.query.pageType && { $unwind: "$listing.listing" },
  //     req.query.pageType && {
  //       $match: { "listing.listing.pageType": req.query.pageType },
  //     },
  //   ].filter((each) => !!each);

  //   let data = await Listing.aggregate([...filters, ...sorts]);

  //   await Listing.populate(data, { path: "listing.listing.listing" });

  //   return res.json({
  //     data,
  //     limit: sorts.limit,
  //     page: parseInt(req.query.page),
  //     sort: parseInt(req.query.sortBy),
  //     documents: data.length,
  //   });
  // } catch (err) {
  //   console.log(err);
  //   return res.status(500).json({ message: "Something went wrong" });
  // }
};

/**
 * @route POST /api/v1/selectors/get-filtered
 * @desc  Get all selectors
 * @access Super private
 **/
export const editFilteredSelectors = async (req, res) => {
  try {
    console.log(req.query.limit, req.query.limit || 0, "rgba data");
    let sorts = {
      $skip: req.query.limit
        ? Math.max(0, parseInt(req.query.page || 1) - 1) *
          parseInt(req.query.limit || 0)
        : 0,
      $sort: { createdAt: parseInt(req.query.sortBy || -1) },
      $limit: parseInt(req.query.limit || 0),
    };

    let filters = [
      req.query.marketplace && {
        $match: { marketplace: req.query.marketplace },
      },
      req.query.country && req.query.marketplace && { $unwind: "$listing" },
      req.query.country && { $match: { "listing.country": req.query.country } },
      req.query.country && { $unwind: "$listing.listing" },
      req.query.pageType && {
        $match: { "listing.listing.pageType": req.query.pageType },
      },
    ].filter((each) => !!each);

    let data = await Listing.aggregate([...filters, ...sorts]);

    await Listing.populate(data, { path: "listing.listing.listing" });

    return res.json({
      data,
      limit: sorts.limit,
      page: parseInt(req.query.page),
      sort: parseInt(req.query.sortBy),
      documents: data.length,
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const findOne = async (req, res) => {
  console.log(req.params._id);
  const market = await Marketplace.findOne({ _id: req.params.id });
  if (market) {
    res.status(200).send(market);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

export const updateMarketplace = async (req, res) => {
  try {
    const id = req.params.id;
    const findData = await Marketplace.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(findData);
    // console.log(findData);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

export const findpagetype = async (req, res) => {
  const market = await PageType.findOne({ _id: req.params.id }).populate(
    "country"
  );
  if (market) {
    res.status(200).send(market);
    console.log(market);
  } else {
    res.status(404).send({ message: "Sorry Not Found" });
  }
};

export const updatepagetype = async (req, res) => {
  try {
    const id = req.params.id;
    const findData = await PageType.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(findData);
    // console.log(findData);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

export const findselectors = async (req, res) => {
  const market = await Listing.findOne({ listing: req.params.id })
    .populate("country listing pageType marketplace")
    .select(
      "pageType country marketplace selectorName selectorText tagName valueAccessProperty hint attribute valueToMatch"
    );

  if (market) {
    res.status(200).send(market);
    console.log(market);
  } else {
    res.status(404).send({ message: "Sorry Not Found" });
  }
};

export const updateselectors = async (req, res) => {
  try {
    const {
      attribute,
      hint,
      selectorName,
      selectorText,
      tagName,
      valueAccessProperty,
      valueToMatch,
    } = req.body;
    const id = req.params.id;
    const findData = await Selector.findByIdAndUpdate(
      id,
      attribute,
      hint,
      selectorName,
      selectorText,
      tagName,
      valueAccessProperty,
      valueToMatch,
      {
        new: true,
      }
    );

    res.status(200).send(findData);
    // console.log(findData);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

export const findcountry = async (req, res) => {
  console.log(req.params.id);
  const market = await Countries.findOne({ _id: req.params.id }).populate(
    "marketplace"
  );

  if (market) {
    res.status(200).send(market);
    console.log(market);
  } else {
    res.status(404).send({ message: "Sorry Not Found" });
  }
};

export const updatecountry = async (req, res) => {
  try {
    const id = req.params.id;
    const findData = await Countries.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).send(findData);
    // console.log(findData);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};
