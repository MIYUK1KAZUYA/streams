import _ from 'lodash';
import React from "react";
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    
    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        if (!this.props.stream) {
            return <div>Loading</div>;
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    //we want to pick only title and description properties and push them to our api
                    initialValues={_.pick(this.props.stream, 'title', 'description')} //initialValues is a specific ReduxForm property
                    onSubmit={this.onSubmit} 
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => { //ownProps reference props inside StreamEdit
    return {stream: state.streams[ownProps.match.params.id]};
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
