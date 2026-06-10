import { Company } from "../models/company.model.js"
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import logger from "../utils/logger.js";
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company Name required",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName })
        if (company) {
            logger.warn({
                event: "company_already_exists",
                companyName,
                userId: req.id
            });
            return res.status(400).json({
                message: "Company already registered",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        logger.info({
            event: "company_registered",
            companyName,
            companyId: company._id,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        })
    } catch (error) {
        logger.info({
            event: "registered_company_error",
            error: error.message,
            stack: error.stack
        });
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; //logged in userId
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "companies not found",
                success: false
            })
        }
        logger.info({
            event: "companies_fetched",
            userId,
            count: companies.length
        });
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        logger.error({
            event: "get_company_error",
            error: error.message,
            stack: error.stack
        });
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            logger.warn({
                event: "company_not_found",
                companyId
            });
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        logger.info({
            event: "company_viewed",
            companyId,
            userId: req.id
        });
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        logger.error({
            event: "get_company_by_id_error",
            error: error.message,
            stack: error.stack
        });
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const updateCompany = async (req, res) => {
    try {

        const { name, description, website, location } = req.body;
        const file = req.file;

        let logo;

        // upload only if file exists
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const updateData = {
            name,
            description,
            website,
            location
        };

        // add logo only if uploaded
        if (logo) {
            updateData.logo = logo;
        }

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        logger.info({
            event: "company_updated",
            companyId: req.params.id,
            userId: req.id,
            updatedFields: Object.keys(updateData).filter(k => updateData[k])
        });

        return res.status(200).json({
            message: "Company information updated.",
            success: true,
            company
        });

    } catch (error) {
        logger.error({
            event: "update_company_error",
            error: error.message,
            stack: error.stack
        });
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}