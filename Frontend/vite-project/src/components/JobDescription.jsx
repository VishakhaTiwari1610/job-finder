import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    // Check if already applied
    const isApplied = singleJob?.applications?.some(
        application =>
            application.applicant?.toString() === user?._id?.toString()
    ) || false;

    // Apply job
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);

                // Update Redux instantly
                dispatch(setSingleJob({
                    ...singleJob,
                    applications: [
                        ...(singleJob?.applications || []),
                        { applicant: user?._id }
                    ]
                }));
            }

        } catch (error) {
            console.log(error);

            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        }
    };

    // Fetch single job
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }

            } catch (error) {
                console.log(error);
            }
        };

        if (jobId) {
            fetchSingleJob();
        }

    }, [jobId, dispatch]);

    return (
        <div className='max-w-7xl mx-auto my-10 px-4'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div>
                    <h1 className='font-bold text-2xl'>{singleJob?.title || "N/A"}</h1>

                    <div className='flex flex-wrap items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant="ghost">
                            {singleJob?.position || 0} Positions
                        </Badge>

                        <Badge className='text-[#F83002] font-bold' variant="ghost">
                            {singleJob?.jobType || "N/A"}
                        </Badge>

                        <Badge className='text-[#7209b7] font-bold' variant="ghost">
                            {singleJob?.salary || 0} LPA
                        </Badge>
                    </div>
                </div>

                <Button
                    onClick={!isApplied ? applyJobHandler : undefined}
                    disabled={isApplied}
                    className={`rounded-lg ${
                        isApplied
                            ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                            : "bg-[#7209b7] hover:bg-[#5f32ad]"
                    }`}
                >
                    {isApplied ? "Already Applied" : "Apply Now"}
                </Button>
            </div>

            <h1 className='border-b-2 border-b-gray-300 font-medium py-4 mt-8'>
                Job Description
            </h1>

            <div className='my-4 space-y-3'>
                <h1 className='font-bold'>
                    Role:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.title || "N/A"}
                    </span>
                </h1>

                <h1 className='font-bold'>
                    Location:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.location || "N/A"}
                    </span>
                </h1>

                <h1 className='font-bold'>
                    Description:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.description || "N/A"}
                    </span>
                </h1>

                <h1 className='font-bold'>
                    Experience:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.experienceLevel || 0} years
                    </span>
                </h1>

                <h1 className='font-bold'>
                    Salary:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.salary || 0} LPA
                    </span>
                </h1>

                <h1 className='font-bold'>
                    Total Applicants:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.applications?.length || 0}
                    </span>
                </h1>

                <h1 className='font-bold'>
                    Posted Date:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.createdAt
                            ? new Date(singleJob.createdAt).toLocaleDateString()
                            : "N/A"}
                    </span>
                </h1>
            </div>
        </div>
    )
}

export default JobDescription