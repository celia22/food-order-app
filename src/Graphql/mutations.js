import { gql } from "@apollo/client";

export const createBooking = gql`
	mutation($input: CreateBookingInput!) {
		createBooking(input: $input)
	}
`;
