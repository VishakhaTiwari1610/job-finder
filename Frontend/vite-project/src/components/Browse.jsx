import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux';
import { setsearchedQuery } from '@/redux/jobSlice';
import usegetAllJobs from '@/hooks/usegetAllJobs';


const Browse = () => {
    usegetAllJobs();
    const { allJobs , setsearchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(setsearchedQuery(""));
        }
    }, [])

    const filteredJobs = allJobs.filter((job) =>
    job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
    job.company?.name?.toLowerCase().includes(searchedQuery.toLowerCase())
);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1>Search Results ({filteredJobs.length})</h1>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                    {filteredJobs.map((job) => (
                        <Job key={job._id} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Browse
