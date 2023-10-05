'use client'
import FoodList from "./foodList"
import PageLayout from '@/layout/pageLayout'
import { HiPlus } from 'react-icons/hi';
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";


const FoodListPage = () => {
	const router = useRouter()

  const handleAddClick = (e) => {
    e.preventDefault()
    router.push('/foods/create')
  }
	return (
		<PageLayout>
			<div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
				<div className='dashboard-content-header'>
					<h2 className='text-3xl font-bold'>Food List</h2>
					<div onClick={handleAddClick}>
						<Button>
							<div className='flex flex-row justify-center gap-4'>
								<div className="my-auto">
									<HiPlus />
								</div>
								<p>
									Add new food
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