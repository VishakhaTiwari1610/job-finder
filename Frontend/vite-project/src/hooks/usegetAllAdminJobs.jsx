import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const usegetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`, { withCredentials: true });
                
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                    console.log(res.data);
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllJobs();
    },[dispatch])

}

export default usegetAllAdminJobs