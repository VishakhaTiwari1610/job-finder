import { Job } from "../models/job.model.js";
import logger from "../utils/logger.js"

// For admin - Post Job
export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId
        } = req.body;
        console.log(req.body);
        const userId = req.id;

        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !jobType ||
            !experience ||
            !position ||
            !companyId
        ) {
            logger.warn({
                event:"post_job_validation_failed",
                userId,
                missingFields: Object.entries({
                    title,description,requirements,salary,location,jonType,experience,position,companyId
                })
                .filter(([_,v]) => !v)
                .map(([k]) => k)
            });

            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: Number(experience),
            position: Number(position),
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });

    } catch (error) {
        logger.error({
            event: "post_job_error",
            error: error.message,
            stack: error.stack
        });
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// For students - Get All Jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await Job.find(query)
            .populate({
                path: "company"
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        logger.error({
            event: "get_all_jobs_error",
            error: error.message,
            stack: error.stack
        });
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// For students - Get Single Job By ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId)
            .populate({
                path: "company"
            })
            .populate({
                path: "applications"
            });

        if (!job) {
            logger.warn({
                event: "job_not_found",
                jobId
            });
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        logger.error({
            event: "get_job_by_id_error",
            error: error.message,
            stack: error.stack
        });
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// For admin - Get Admin Jobs
export const getAdminJobs = async (req, res) => {
    try {
        const userId = req.id;

        const jobs = await Job.find({
            created_by: userId
        })
            .populate("company")
            .sort({ createdAt: -1 });

            
        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        logger.error({
            event: "get_admin_jobs_error",
            error: error.message,
            stack: error.stack
        });
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};