'use client'
import BirdList from "./birdList"
import PageLayout from '@/layout/pageLayout'
import { HiPlus } from 'react-icons/hi';
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";


const BirdListPage = () => {
	const router = useRouter()

  const handleAddClick = (e) => {
    e.preventDefault()
    router.push('/birds/create')
  }
	return (
		<PageLayout>
			<div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
				<div className='flex flex-row justify-between'>
					<h2 className='text-3xl font-bold'>Bird List</h2>
					<div onClick={handleAddClick}>
						<Button>
							<div className='flex flex-row justify-center gap-4'>
								<div className="my-auto">
									<HiPlus />
								</div>
								<p>
									Add new bird
								</p>
							</div>
						</Button>
					</div>
				</div>
				<BirdList />
			</div>

		</PageLayout>
	)
}

export default BirdListPage