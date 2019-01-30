import React from "react";
import { Formik } from "formik";

class WizardCreateClient extends React.Component {
    static Page = ({ children }) => children;
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            values: props.initialValues
        };
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    next(values) {
        const { page } = this.state;
        this.setState({
            page: Math.min(page + 1, this.props.children.length - 1),
            values
        });
    }
    previous() {
        const { page } = this.state;
        this.setState({
            page: Math.max(page - 1, 0)
        });
    }
    validate(values) {
        const { page } = this.state;
        const { children } = this.props;
        const activePage = React.Children.toArray(children)[page];
        return activePage.props.validate
            ? activePage.props.validate(values)
            : {};
    }
    handleSubmit(values, bag) {
        const { children, onSubmit } = this.props;
        const { page } = this.state;
        const isLastPage = page === React.Children.count(children) - 1;
        if (isLastPage) {
            return onSubmit(values, bag);
        } else {
            this.next(values);
            bag.setSubmitting(false);
        }
    }

    render() {
        const { children } = this.props;
        const { page, values } = this.state;
        const activePage = React.Children.toArray(children)[page];
        console.log(React.Children.toArray(children));
        console.log(activePage);
        const isLastPage = page === React.Children.count(children) - 1;
        return (
            <Formik
                initialValues={values}
                enableReinitialize={false}
                validate={this.validate}
                onSubmit={this.handleSubmit}
                render={props => (
                    <form onSubmit={props.handleSubmit}>
                        {React.cloneElement(activePage, {
                            parentState: { ...props }
                        })}
                        <div className="buttons">
                            {page > 0 && (
                                <button type="button" onClick={this.previous}>
                                    « Previous
                                </button>
                            )}

                            {!isLastPage && (
                                <button type="submit">Next »</button>
                            )}
                            {isLastPage && (
                                <button
                                    type="submit"
                                    disabled={props.isSubmitting}
                                >
                                    Submit
                                </button>
                            )}
                        </div>

                        <pre>{JSON.stringify(values, null, 2)}</pre>
                    </form>
                )}
            />
        );
    }
}

export default WizardCreateClient;
