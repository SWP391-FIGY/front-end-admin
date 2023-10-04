'use client'
import { Button } from "flowbite-react"
import FoodList from "./foodList"
import PageLayout from '@/layout/pageLayout'
import { HiPlus } from 'react-icons/hi';


const FoodListPage = () => {

	return (
		<PageLayout>
			<div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
				<div className='flex flex-row justify-between'>
					<h2 className='text-3xl font-bold'>Food List</h2>
					<div className='dashboard-content-search'>
						<Button >
							<div className='flex flex-row justify-center gap-4'>
								<div className="my-auto">
									<HiPlus />
								</div>
								<p>
									Buy now
								</p>
							</div>

						</Button>
					</div>
				</div>
				<FoodList />
			</div>

		</PageLayout>
	)
}

export default FoodListPage