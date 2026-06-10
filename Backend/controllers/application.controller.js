import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import logger from "../utils/logger.js";

// APPLY JOB
export const applyJobs = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        // check jobId
        if (!jobId) {
            return res.status(400).json({
                message: "Job Id is required.",
                success: false
            });
        }

        // check if already applied
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        if (existingApplication) {
            logger.warn({
                event: "application_duplicate",
                userId,
                jobId
            });
            return res.status(400).json({
                message: "Already applied.",
                success: false
            });
        }

        // check job exists
        const job = await Job.findById(jobId);

        if (!job) {
            logger.warn({
                event: "application_job_not_found",
                userId,
                jobId
            });
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // create application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        // push application id inside job
        job.applications.push(newApplication._id);
        await job.save();
        logger.info({
            event: "application_submitted",
            userId,
            jobId,
            jobTitle: job.title,
            applicationId: newApplication._id
        });


        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        });

    } catch (error) {
        logger.error({
            event:"apply_job_error",
            error: error.message,
            stack:error.stack
        });
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


// GET APPLIED JOBS
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                populate: {
                    path: "company"
                }
            });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found.",
                success: false
            });
        }
        logger.info({
            event:"applied_jobs_fetched",
            userId,
            count:application.length
        });
        return res.status(200).json({
            applications,
            success: true
        });

    } catch (error) {
        logger.error({
            event:"get_applied_jobs_error",
            error: error.message,
            stack:error.stack
        });
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


// GET APPLICANTS
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        logger.info({
            event: "application_viewed",
            jobId,
            recruiterId: req.id,
            applicationCount: job.application.length
        });

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        logger.error({
            event: "get_application_error",
            error: error.message,
            stack: error.stack
        });
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


//UPDATE APPLICATION STATUS 
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required.",
                success: false
            });
        }

        // find application
        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        // update status
        application.status = status.toLowerCase();
        await application.save();

        logger.info({
            event:"application_status_updated",
            applicationId,
            recruiterId:req.id,
            previousStatus,
            newStatus: status.lowerCase()
        })

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        logger.error({
            event: "updated_status_error",
            error: error.message,
            stack: error.stack
        })
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};