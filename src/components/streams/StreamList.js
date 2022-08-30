import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin(stream) { //checks what streams can current user edit/delete
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <button className="ui button negative">
                        Delete
                    </button>
                </div>
            );
        }
    }

    renderCreate() { //to create 'Create stream' button
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    //this helper takes list of streams and renders them as list on screen
    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">{stream.description}</div>
                    </div>  
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }  
}
//we need to show list of streams inside our component so we define:
const mapStateToProps = (state) => {
    return { 
        streams: Object.values(state.streams), //Object.values takes all values from an object and puts them in array
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    } ;
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
