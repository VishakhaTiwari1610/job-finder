import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './shared/avatar'
import { Contact, LucideBadgeTurkishLira, Mail, Pen } from 'lucide-react'
import { Button } from './shared/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "css", " Javascript", "React.js"]
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const isResume = user?.profile?.resume;
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage src=" https://imgs.search.brave.com/Oq-JXDdyqSvI5dcFgdmrGWjwYqnzHedVGHxfI4YSjaA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5zaW1pbGFycG5n/LmNvbS9maWxlL3Np/bWlsYXJwbmcvdmVy/eS10aHVtYm5haWwv/MjAyMS8wOS9MZXR0/ZXItTi1sb2dvLWRl/c2lnbi10ZW1wbGF0/ZS1vbi10cmFuc3Bh/cmVudC1iYWNrZ3Jv/dW5kLVBORy5wbmc" alt="profile" />
            </Avatar>
            <div className='flex flex-col'>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className='text-right' variant="outline"><Pen /></Button>
        </div>
        <div>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user?.email}</span></div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1>Skills</h1>
          <div className='flex items-center gap-1'>
            {
              user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-md font-bold'>Resume</Label>

          {user?.profile?.resume ? (
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={user?.profile?.resume}
              className='text-blue-500 w-full hover:underline cursor-pointer'
            >
              {user?.profile?.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Job</h1>
        {/* Application Table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile