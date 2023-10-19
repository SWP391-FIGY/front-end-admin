import { Button, Table } from 'flowbite-react'
import React from 'react'
import { speciesInfo } from './speciesInfo'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';


const SpeciesList = () => {
	const router = useRouter()
	if (!speciesInfo) return (
		<>No Data</>
	)
	return (
		<>
			<Table className='table-auto'>
				<Table.Head>
					<Table.HeadCell>ID</Table.HeadCell>
					<Table.HeadCell>Color</Table.HeadCell>
					<Table.HeadCell>Size</Table.HeadCell>
					<Table.HeadCell>Voice</Table.HeadCell>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell>Age</Table.HeadCell>
                    <Table.HeadCell>Habitat</Table.HeadCell>
                    <Table.HeadCell>Total</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{speciesInfo.map((species, index) => {
						return (
							<Table.Row key={index}>
								<Table.Cell><span>{index}</span></Table.Cell>
								<Table.Cell><span>{species.color}</span></Table.Cell>
                                <Table.Cell><span>{species.size}</span></Table.Cell>
								<Table.Cell><span>{species.voice}</span></Table.Cell>
                                <Table.Cell>
                                    <img
                                        src={species.imageLink}
                                        alt={`Species Image ${index}`}
                                        style={{ width: '100px', height: 'auto' }}
                                    />
                                </Table.Cell>
                                <Table.Cell><span>{species.age}</span></Table.Cell>
                                <Table.Cell><span>{species.habitat}</span></Table.Cell>
                                <Table.Cell><span>{species.total}</span></Table.Cell>
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

export default SpeciesList