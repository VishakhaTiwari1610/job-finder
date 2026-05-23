import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setsearchJobByText } from '@/redux/jobSlice'

import AdminJobsTable from './AdminJobsTable'
import usegetAllAdminJobs from '@/hooks/usegetAllAdminJobs'

const AdminJobs = () => {
  usegetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setsearchJobByText(input));
  }, [input,dispatch])
  return (
    <div>
      <Navbar />

      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5 gap-4'>
          <Input
            className='w-fit'
            placeholder='Filter by name,role.'
            onChange={(e) => setInput(e.target.value)}
          />

          <Button onClick={() => navigate('/admin/jobs/create')}>
    New Job
</Button>
        </div>

        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs