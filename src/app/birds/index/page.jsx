'use client'
import BirdList from "./birdList"
import PageLayout from '@/layout/pageLayout'


const BirdListPage = () => {

	return (
		<PageLayout>
			<div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
				<div className='dashboard-content-header'>
					<h2 className='text-3xl font-bold'>Bird List</h2>
					<div className='dashboard-content-search'>

					</div>
				</div>
				<BirdList />
			</div>

		</PageLayout>
	)
}

export default BirdListPage