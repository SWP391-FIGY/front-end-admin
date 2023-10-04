import { Button, Table } from 'flowbite-react'
import React from 'react'
import { birdInfo } from './birdInfo'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';


const BirdList = () => {
	if (!birdInfo) return (
		<>No Data</>
	)
	return (
		<>
			<Table className='table-auto'>
				<Table.Head>
					<Table.HeadCell>ID</Table.HeadCell>
					<Table.HeadCell>Name</Table.HeadCell>
					<Table.HeadCell>Species</Table.HeadCell>
					<Table.HeadCell>Birth Date</Table.HeadCell>
					<Table.HeadCell>Gender</Table.HeadCell>
					<Table.HeadCell>Status</Table.HeadCell>
					<Table.HeadCell>Actions</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{birdInfo.map((bird, index) => {
						return (
							<Table.Row key={index}>
								<Table.Cell><span>{index}</span></Table.Cell>
								<Table.Cell><span>{bird.name}</span></Table.Cell>
								<Table.Cell><span>{bird.species}</span></Table.Cell>
								<Table.Cell><span>{bird.birthDate}</span></Table.Cell>
								<Table.Cell><span>{bird.gender}</span></Table.Cell>
								<Table.Cell><span>{bird.status}</span></Table.Cell>
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

export default BirdList