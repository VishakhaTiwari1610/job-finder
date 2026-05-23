import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import CompaniesTable from './CompaniesTable'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCompanies, setsearchCompanyByText } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'

const Companies = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(
                    `${COMPANY_API_END_POINT}/get`,
                    {
                        withCredentials: true
                    }
                );

                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchCompanies();
    }, []);
    const [input, setInput] = useState("");
    useEffect(() => {
        dispatch(setsearchCompanyByText(input));
    }, [input])
    return (
        <div>
            <Navbar />

            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5 gap-4'>
                    <Input
                        className='w-fit'
                        placeholder='Filter by name'
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <Button onClick={() => navigate('/admin/companies/create')}>
                        New Company
                    </Button>
                </div>

                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies