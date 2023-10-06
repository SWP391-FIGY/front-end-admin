import { Button, Table } from 'flowbite-react'
import React from 'react'
import { birdInfo } from './birdInfo'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';


const BirdList = () => {
	const router = useRouter()
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
										<FiEdit onClick={()=> {router.push(`edit/${index}`)}}/>
									</Button>
									<Button>
										<FiEye onClick={()=> {router.push(`details/${index}`)}}/>
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