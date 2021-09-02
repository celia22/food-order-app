import { gql } from "@apollo/client";

// complete query, not currently working 'cause of non-nullable fields
/*export const getCenter = gql`
	query getCenter($id: ID!) {
		getCenter(_id: $id) {
			_id
			name
			address
			city
			phoneNumber
			logo
			pictures
			services {
				name
				description
				duration
				price
			}
		}
	}
`;*/

export const getCenter = gql`
	query getCenter($id: ID!) {
		getCenter(_id: $id) {
			_id
			name
			address
			city
			phoneNumber
			logo
		}
	}
`;

export const searchCenter = gql`
	query searchCenter($name: String!) {
		searchCenter(name: $name) {
			_id
			name
			logo
			pictures
			address
			city
		}
	}
`;

export const getCenterByEmail = gql`
	query getCenterByEmail($email: String!) {
		getCenterByEmail(email: $email) {
			_id
			name
			address
			city
			phoneNumber
			logo
			pictures
		}
	}		
`;

export const getCenterAvailability = gql`
	query getCenter($id: ID!, $duration: Int, $day: DateTime) {
		getCenter(_id: $id) {
	  		getAvailability(day: $day, duration: $duration)
		}
	}
`;

export const getCenters = gql`
	query getCenters($coordinates: [Float!]!) {
		getCenters(coordinates: $coordinates) {
			name
			_id
			logo
			pictures
		}
	}
`;

export const getProfile = gql`
	query {
		getProfile {
			...client
		}
	}
	
	fragment client on Client {
		fullname
		email
		phoneNumber
	}
`;

