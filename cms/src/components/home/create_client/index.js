import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import WizardCreateClientPageOne from "./WizardCreateClientPageOne";
import WizardCreateClientPageTwo from "./WizardCreateClientPageTwo";

const initialValues = {
    venue_name: "NEAL's HOTEL",
    nature_of_business: "HOTEL BBQ",
    venue_phone: "",
    venue_email: "",
    venue_address: "",
    venue_city: "",
    venue_postcode: "",
    venue_state: null,
    venue_country: null,
    venue_postal_address: "",
    venue_postal_city: "",
    venue_postal_postcode: "",
    venue_postal_state: null,
    venue_postal_country: null,
    contact_name: "",
    contact_position: "",
    contact_email: "",
    contact_phone: "",
    contact_mobile: ""
};

const ContainerDiv = styled.div`
    padding-left: 350px;
    width: 100%;
    height: 100%;
`;

const array_components = [
    lazy(() => import("./WizardCreateClientPageOne")),
    lazy(() => import("./WizardCreateClientPageTwo"))
];

class CreateClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page_index: 0
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    next() {
        const { page_index } = this.state;
        this.setState({
            page_index: Math.min(page_index + 1, array_components.length - 1)
        });
    }

    previous() {
        const { page_index } = this.state;
        this.setState({
            page_index: Math.max(page_index - 1, 0)
        });
    }

    render() {
        const { page_index } = this.state;
        const SelectedComponent = array_components[page_index];
        return (
            <ContainerDiv>
                <Suspense>
                    <SelectedComponent
                        next={this.next}
                        previous={this.previous}
                    />
                </Suspense>
            </ContainerDiv>
        );
    }
}

export default CreateClient;
