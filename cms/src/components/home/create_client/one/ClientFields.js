export default [
    [
        {
            name: "name",
            label: "Client Name",
            required: true,
            flexBasis: "30%",
            marginRight: "10px",
            type: "text"
        },
        {
            name: "full_company_name",
            label: "Full Client Name",
            required: false,
            flexBasis: "30%",
            marginRight: "10px",
            type: "text"
        },
        {
            name: "nature_of_business",
            label: "Nature of Business",
            required: true,
            flexBasis: "30%",
            marginRight: "0px",
            type: "text"
        }
    ],
    [
        {
            name: "phone",
            label: "Venue Phone Number",
            required: true,
            flexBasis: "45%",
            marginRight: "10px",
            type: "text"
        },
        {
            name: "email",
            label: "Business Email",
            required: true,
            flexBasis: "45%",
            marginRight: "0px",
            type: "text"
        }
    ],
    [
        {
            name: "venue_address",
            label: "Venue Address",
            required: true,
            flexBasis: "45%",
            marginRight: "10px",
            type: "text"
        },
        {
            name: "postal_address",
            label: "Postal Address",
            required: false,
            flexBasis: "45%",
            marginRight: "0px",
            type: "text"
        }
    ],
    [
        {
            name: "venue_city",
            label: "City",
            required: true,
            flexBasis: "20%",
            marginRight: "10px",
            type: "text"
        },
        {
            name: "venue_zip_code",
            label: "Zip Code",
            required: true,
            flexBasis: "20%",
            marginRight: "30px",
            type: "text"
        },
        {
            name: "postal_city",
            label: "City",
            required: true,
            flexBasis: "20%",
            marginRight: "10px",
            type: "text"
        },
        {
            name: "postal_zip_code",
            label: "Zip Code",
            required: true,
            flexBasis: "20%",
            marginRight: "0px",
            type: "text"
        }
    ],
    [
        {
            name: "country_id",
            label: "Country",
            required: true,
            flexBasis: "45%",
            marginRight: "10px",
            type: "select",
            select_id: "select-1"
        },
        {
            name: "postal_country_id",
            label: "Country",
            required: true,
            flexBasis: "45%",
            marginRight: "0px",
            type: "select",
            select_id: "select-2"
        }
    ],
    [
        {
            name: "venueStateId",
            label: "State / Province (If Applicable)",
            required: true,
            flexBasis: "45%",
            marginRight: "10px",
            type: "select",
            select_id: "select-3"
        },
        {
            name: "postalStateId",
            label: "State / Province (If Applicable)",
            required: true,
            flexBasis: "45%",
            marginRight: "0px",
            type: "select",
            select_id: "select-4"
        }
    ]
];
