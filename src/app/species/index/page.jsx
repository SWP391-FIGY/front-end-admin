'use client'
import SpeciesList from "./speciesList"
import PageLayout from '@/layout/pageLayout'
import { HiPlus } from 'react-icons/hi';
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";


const SpeciesListPage = () => {
	const router = useRouter()

  const handleAddClick = (e) => {
    e.preventDefault()
    router.push('/species/create')
  }
	return (
		<PageLayout>
			<div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
				<div className='dashboard-content-header'>
					<h2 className='text-3xl font-bold'>Species List</h2>
					<div onClick={handleAddClick}>
						<Button>
							<div className='flex flex-row justify-center gap-4'>
								<div className="my-auto">
									<HiPlus />
								</div>
								<p>
									Add new species
								</p>
							</div>
						</Button>
					</div>
				</div>
				<SpeciesList />
			</div>

		</PageLayout>
	)
}

export default SpeciesListPage