import { gql } from "@apollo/client";

export const createBooking = gql`
	mutation($input: CreateBookingInput!) {
		createBooking(input: $input)
	}
`;

export const createCenter = gql` 
	mutation createCenter($input: CreateCenterInput!) {
	createCenter(input: $input)
  }
  `

export const createEmployee = gql` 
	mutation creatEmployee($input: CreateEmployeeInput!) {
		createEmployee(input: $input)
  }
  `

export const createService = gql` 
	mutation createService($input: createServiceInput!) {
		createService(input: $input)
  }
  `