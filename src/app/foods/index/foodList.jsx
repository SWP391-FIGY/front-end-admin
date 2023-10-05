import { Button, Table } from 'flowbite-react'
import React from 'react'
import { foodInfo } from './foodInfo'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';


const FoodList = () => {
	if (!foodInfo) return (
		<>No Data</>
	)
	return (
		<>
			<Table className='table-auto'>
				<Table.Head>
					<Table.HeadCell>ID</Table.HeadCell>
					<Table.HeadCell>Name</Table.HeadCell>
					<Table.HeadCell>Nutritional Ingredients</Table.HeadCell>
					<Table.HeadCell>Storage Conditions</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{foodInfo.map((food, index) => {
						return (
							<Table.Row key={index}>
								<Table.Cell><span>{index}</span></Table.Cell>
								<Table.Cell><span>{food.name}</span></Table.Cell>
                                <Table.Cell><span>{food.nutritionalIngredients}</span></Table.Cell>
								<Table.Cell><span>{food.storageConditions}</span></Table.Cell>
								<Table.Cell className='flex flex-row gap-4'>
									<Button>
										<FiEdit />
									</Button>
									<Button>
										<FiEye />
									</Button>
									<Button>
										<FiTrash2 />
									</Button>
								</Table.Cell>
							</Table.Row>
						)
					})}
				</Table.Body>
			</Table>

		</>
	)
}

export default FoodList