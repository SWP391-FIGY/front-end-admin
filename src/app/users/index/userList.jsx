import { Button, Table } from 'flowbite-react'
import React from 'react'
import { userInfo } from './userInfo'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';


const UserList = () => {
	if (!userInfo) return (
		<>No Data</>
	)
	return (
		<>
			<Table className='table-auto'>
				<Table.Head>
					<Table.HeadCell>ID</Table.HeadCell>
					<Table.HeadCell>Name</Table.HeadCell>
					<Table.HeadCell>Email</Table.HeadCell>
					<Table.HeadCell>Password</Table.HeadCell>
					<Table.HeadCell>Phone number</Table.HeadCell>
					<Table.HeadCell>Role</Table.HeadCell>
					<Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{userInfo.map((user, index) => {
						return (
							<Table.Row key={index}>
								<Table.Cell><span>{index}</span></Table.Cell>
								<Table.Cell><span>{user.name}</span></Table.Cell>
								<Table.Cell><span>{user.email}</span></Table.Cell>
								<Table.Cell><span>{user.password}</span></Table.Cell>
								<Table.Cell><span>{user.phoneNumber}</span></Table.Cell>
                                <Table.Cell><span>{user.role}</span></Table.Cell>
								<Table.Cell><span>{user.status}</span></Table.Cell>
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

export default UserList