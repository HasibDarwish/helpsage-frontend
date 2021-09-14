import React, { Component } from 'react'
import { Row, Col } from "react-bootstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

export default class Address extends Component {
    state = {
        country: null,
        region: null,
    };

    render() {
        return (
            <Row className="gx-4 d-flex flex-row justify-content-evenly">

                <Col>
                    <CountryDropdown
                        value={this.props.country}
                        onChange={(val) => this.props.setCountry(val)}
                        className="p-2 w-100 me-2 inputStyle"
                    />
             </Col>
            <Col >
                    <RegionDropdown
                        country={this.props.country ? this.props.country : "Select Country"}
                        value={this.props.region ? this.props.region : "Select City"}
                        onChange={(val) => this.props.setCity(val)}
                        className="p-2 w-100 me-2 inputStyle"
    
                    />
            </Col>
            </Row>

        )
    }
}
