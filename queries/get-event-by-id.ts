import { gql } from 'graphql-request';

export const GET_EVENT_BY_ID = gql`
    query EventById($eventId: ID!) {
        eventPerson(eventId: $eventId) {
            nodes {
                id
                firstName
                lastName
                email
                biography
                photoUrl
                organization
                jobTitle
                speakerOnPlannings {
                    id
                    beginsAt
                    endsAt
                    categories
                    description
                    descriptionTranslations {
                        language
                        value
                    }
                    htmlDescription
                    place
                    title
                    titleTranslations {
                        language
                        value
                    }
                    type
                }
            }
        }
    }
`;
