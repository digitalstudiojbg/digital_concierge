import React from "react";
import "./Loading.css";
import { ClipLoader, DotLoader } from "react-spinners";
import { COLOR_JBG_PURPLE } from "../../utils/Constants";

class loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    render() {
        if (this.props.button) {
            return (
                <ClipLoader
                    sizeUnit={"px"}
                    size={16}
                    color={"rgb(38,56,140)"}
                    loading={this.state.loading}
                />
            );
        }
        return (
            <div>
                <div className="loading_container">
                    <div className="sweet-loading">
                        {this.props.loadingData ? (
                            <ClipLoader
                                sizeUnit={"px"}
                                size={100}
                                color={"rgb(38,56,140)"}
                                loading={this.state.loading}
                            />
                        ) : (
                            <DotLoader
                                sizeUnit={"px"}
                                size={150}
                                color={COLOR_JBG_PURPLE}
                                loading={this.state.loading}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default loading;
